import {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { categoryPackageResponseSchema } from "../dtos/categoryPackageResponse.dto";
import { countryResponseSchema } from "../dtos/countryResponse.dto";
import { createCategoryPackageSchema } from "../dtos/createCategoryPackage.dto";
import { createCountrySchema } from "../dtos/createCountry.dto";
import { createDestinationSchema } from "../dtos/createDestination.dto";
import { createPackageSchema } from "../dtos/createPackage.dto";
import { createReservationSchema } from "../dtos/createReservation.dto";
import { createUserSchema } from "../dtos/createUser.dto";
import { destinationResponseSchema } from "../dtos/destinationResponse.dto";
import { loginSchema } from "../dtos/login.dto";
import { packageResponseSchema } from "../dtos/packageResponse.dto";
import { paginatedCategoryPackageResponseSchema } from "../dtos/paginatedCategoryPackageResponse.dto";
import { paginatedCountryResponseSchema } from "../dtos/paginatedCountryResponse.dto";
import { paginatedDestinationResponseSchema } from "../dtos/paginatedDestinationResponse.dto";
import { paginatedReservationsResponseSchema, reservationResponseSchema } from "../dtos/reservationResponse.dto";
import { updatePackageSchema } from "../dtos/updatePackage.dto";
import { userResponseSchema } from "../dtos/userResponse.dto";
import { registerAuthPaths } from "./paths/auth.paths";
import { registerCategoryPackagePaths } from "./paths/categoryPackage.paths";
import { registerCountryPaths } from "./paths/country.paths";
import { registerDestinationPaths } from "./paths/destination.paths";
import { registerReservationPaths } from "./paths/reservation.paths";
import { registerUserPaths } from "./paths/user.paths";
import { registerPackagePaths } from "./paths/package.paths";

const registry = new OpenAPIRegistry();

registry.register("CreateUserDto", createUserSchema);
registry.register("LoginDto", loginSchema);
registry.register("UserResponseDto", userResponseSchema);


registry.register("CreatePackageDto", createPackageSchema);
registry.register("UpdatePackageDto", updatePackageSchema);
registry.register("PackageResponseDto", packageResponseSchema);

registry.register("CreateReservationDto", createReservationSchema);
registry.register("ReservationResponseDto", reservationResponseSchema);
registry.register("PaginatedReservationsResponseDto", paginatedReservationsResponseSchema);

registry.register("CreateDestinationDto", createDestinationSchema);
registry.register("DestinationResponseDto", destinationResponseSchema);
registry.register("PaginatedDestinationResponseDto", paginatedDestinationResponseSchema);

registry.register("CreateCategoryPackageDto", createCategoryPackageSchema);
registry.register("CategoryPackageResponseDto", categoryPackageResponseSchema);
registry.register("PaginatedCategoryPackageResponseDto", paginatedCategoryPackageResponseSchema);

registry.register("CreateCountryDto", createCountrySchema);
registry.register("CountryResponseDto", countryResponseSchema);
registry.register("PaginatedCountryResponseDto", paginatedCountryResponseSchema);



registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
});

registerAuthPaths(registry);
registerUserPaths(registry);
registerCountryPaths(registry);
registerCategoryPackagePaths(registry);
registerDestinationPaths(registry);
registerReservationPaths(registry);
registerPackagePaths(registry);

const generator = new OpenApiGeneratorV3(registry.definitions);



export const openApiDocument = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "Agencia de Viajes API",
        version: "1.0.0",
        description: "API REST para gestión de paquetes turísticos, reservas, usuarios, destinos, países y categorías.",
    },
    servers: [{
        url: "http://localhost:8000",
        description: "Local development server"
    }],
    security: [{ bearerAuth: [] }],
});