import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../../config/zod.config";
import { createReservationSchema } from "../../dtos/createReservation.dto";
import { paginatedReservationsResponseSchema, reservationResponseSchema } from "../../dtos/reservationResponse.dto";
import { ReservationStatusEnum } from "../../entity/reservation.entity";

export function registerReservationPaths(registry: OpenAPIRegistry) {
    registry.registerPath({
        method: "get",
        path: "/reservations",
        tags: ["Reservations"],
        summary: "Obtener reservas paginadas",
        description: "Requiere JWT. Permite obtener reservas paginadas y filtrar opcionalmente por estado.",
        security: [{ bearerAuth: [] }],
        request: {
            query: z.object({
                limit: z.coerce.number().int().min(1).max(50).optional(),
                page: z.coerce.number().int().min(1).optional(),
                status: z.enum(ReservationStatusEnum).optional(),
            }),
        },
        responses: {
            200: {
                description: "Lista de reservas paginadas",
                content: {
                    "application/json": {
                        schema: paginatedReservationsResponseSchema,
                    },
                },
            },
            401: { description: "Token ausente o inválido" },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/reservations/{id}",
        tags: ["Reservations"],
        summary: "Obtener reserva por ID",
        description: "Requiere JWT. Obtiene el detalle de una reserva por su identificador.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({
                id: z.uuid(),
            }),
        },
        responses: {
            200: {
                description: "Reserva encontrada",
                content: {
                    "application/json": {
                        schema: reservationResponseSchema,
                    },
                },
            },
            401: { description: "Token ausente o inválido" },
            404: { description: "Reserva no encontrada" },
        },
    });

    registry.registerPath({
        method: "post",
        path: "/reservations",
        tags: ["Reservations"],
        summary: "Crear reserva",
        description:
            "Requiere JWT. Crea una reserva para el usuario autenticado. Valida disponibilidad de cupos y descuenta los lugares reservados.",
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: createReservationSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Reserva creada",
                content: {
                    "application/json": {
                        schema: reservationResponseSchema,
                    },
                },
            },
            400: { description: "Datos inválidos o cupos insuficientes" },
            401: { description: "Token ausente o inválido" },
            404: { description: "Paquete o usuario no encontrado" },
        },
    });

    registry.registerPath({
        method: "patch",
        path: "/reservations/{id}",
        tags: ["Reservations"],
        summary: "Cambiar estado de una reserva",
        description:
            "Requiere JWT. Cambia el estado de una reserva mediante el parámetro query status.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({
                id: z.uuid(),
            }),
            query: z.object({
                status: z.enum(ReservationStatusEnum),
            }),
        },
        responses: {
            200: {
                description: "Estado de reserva actualizado",
                content: {
                    "application/json": {
                        schema: reservationResponseSchema,
                    },
                },
            },
            400: { description: "Estado inválido o faltante" },
            401: { description: "Token ausente o inválido" },
            403: { description: "El usuario no tiene permiso para modificar esta reserva" },
            404: { description: "Reserva no encontrada" },
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/reservations/{id}",
        tags: ["Reservations"],
        summary: "Cancelar reserva",
        description:
            "Requiere JWT. El usuario solo puede cancelar sus propias reservas, salvo que tenga rol ADMIN. La cancelación restaura los cupos del paquete.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({
                id: z.uuid(),
            }),
        },
        responses: {
            204: { description: "Reserva cancelada correctamente, sin contenido en la respuesta" },
            401: { description: "Token ausente o inválido" },
            403: { description: "El usuario no tiene permiso para cancelar esta reserva" },
            404: { description: "Reserva no encontrada" },
        },
    });
}
