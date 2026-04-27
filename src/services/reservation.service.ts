import { CreateReservationDto } from "../dtos/createReservation.dto";
import { PaginatedReservationsResponseDto, ReservationResponseDto } from "../dtos/reservationResponse.dto";
import { Reservation, ReservationStatusEnum } from "../entity/reservation.entity";
import { BadRequestError } from "../errors/badRequest.error";
import { ForbiddenError } from "../errors/forbidden.error";
import { NotFoundError } from "../errors/notFound.error";
import { PackageRepository } from "../repositories/package.repository";
import { ReservationRepository } from "../repositories/reservation.repository";
import { UserRepository } from "../repositories/user.repository";

export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository = new ReservationRepository(),
        private readonly packageRepository = new PackageRepository(),
        private readonly userRepository = new UserRepository()) { }

    async get(limit: number, page: number, status?: ReservationStatusEnum): Promise<PaginatedReservationsResponseDto> {
        const limitSafe = Math.min(limit, 50);
        const skip = (page - 1) * limitSafe;

        const [reservations, total] = await this.reservationRepository.find(limitSafe, skip, status);

        return {
            data: reservations.map((reservation) => this.toReservationResponseDto(reservation)),
            total,
            page,
            limit: limitSafe,
            totalPages: Math.ceil(total / limitSafe)
        }
    }

    async getById(id: string): Promise<ReservationResponseDto> {
        const reservationFound = await this.reservationRepository.findById(id);

        if (!reservationFound) throw new NotFoundError(`Reservation with id: ${id} not found`);

        return this.toReservationResponseDto(reservationFound);
    }

    async update(id: string, status: ReservationStatusEnum): Promise<ReservationResponseDto> {
        const reservation = await this.reservationRepository.changeStatusById(id, status);

        if (!reservation) throw new NotFoundError(`Reservation with id: ${id} not found`);

        return this.toReservationResponseDto(reservation);
    }

    async deleteById(id: string, userId: string, role: string): Promise<void> {
        const reservation = await this.reservationRepository.findById(id);

        if (!reservation) throw new NotFoundError(`Reservation with id: ${id} not found`);
        if (reservation.user.id !== userId && role !== "ADMIN") throw new ForbiddenError();
        if (reservation.status === ReservationStatusEnum.CANCELLED) return;
        
        reservation.package.availableSlots += reservation.totalPassengers;

        await this.packageRepository.save(reservation.package);

        await this.reservationRepository.delete(id);
    }

    async create(createReservationDto: CreateReservationDto, userId: string): Promise<ReservationResponseDto> {

        const packageFound = await this.packageRepository.findById(createReservationDto.packageId);

        if (!packageFound) throw new NotFoundError(`Package with id: ${createReservationDto.packageId} not found`);

        if (packageFound.availableSlots < createReservationDto.totalPassengers) {
            throw new BadRequestError(`Only ${packageFound.availableSlots} slots left`)
        }

        const userFound = await this.userRepository.findById(userId);

        if (!userFound) throw new NotFoundError(`User with id: ${userId} not found`);

        const reservation = await this.reservationRepository.createEntity({
            reservationDate: new Date(),
            notes: createReservationDto.notes,
            finalPrice: packageFound.price * createReservationDto.totalPassengers,
            package: packageFound,
            user: userFound,
            status: ReservationStatusEnum.PENDING,
            totalPassengers: createReservationDto.totalPassengers,
        })

        const createdReservation = await this.reservationRepository.save(reservation)

        packageFound.availableSlots -= createReservationDto.totalPassengers;
        await this.packageRepository.save(packageFound);

        return this.toReservationResponseDto(createdReservation);
    }

    private toReservationResponseDto(reservation: Reservation): ReservationResponseDto {
        return {
            id: reservation.id,
            reservationDate: reservation.reservationDate,
            totalPassengers: reservation.totalPassengers,
            finalPrice: reservation.finalPrice,
            notes: reservation.notes,
            status: reservation.status,
            package: {
                id: reservation.package.id,
                title: reservation.package.title,
                startDate: reservation.package.startDate,
                endDate: reservation.package.endDate,
            },
            user: {
                id: reservation.user.id,
                firstName: reservation.user.firstName,
                lastName: reservation.user.lastName,
                email: reservation.user.email,
            },
            destination: {
                id: reservation.package.destination.id,
                name: reservation.package.destination.name
            }
        };
    }
}