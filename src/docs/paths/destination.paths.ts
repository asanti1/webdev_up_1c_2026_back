import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../../config/zod.config";
import { destinationResponseSchema } from "../../dtos/destinationResponse.dto";
import { paginatedDestinationResponseSchema } from "../../dtos/paginatedDestinationResponse.dto";
import { updateDestinationSchema } from "../../dtos/updateDestination.dto";
import { createDestinationSchema } from "../../dtos/createDestination.dto";

export function registerDestinationPaths(registry: OpenAPIRegistry) {
    registry.registerPath({
        method: "get",
        path: "/destinations/{id}",
        tags: ["Destinations"],
        summary: "Obtener destino por ID",
        description: "Destino encontrado",
        request: {
            params: z.object({ id: z.uuid() }),
        },
        responses: {
            200: {
                description: "Destination encontrado",
                content: {
                    "application/json": {
                        schema: destinationResponseSchema,
                    },
                },
            },
            404: { description: "Destination no encontrado" },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/destinations",
        tags: ["Destinations"],
        summary: "Obtener destinations paginados",
        request: {
            query: z.object({
                limit: z.coerce.number().int().min(1).max(50).optional(),
                page: z.coerce.number().int().min(1).optional(),
            }),
        },
        responses: {
            200: {
                description: "Lista de destinations encontrados",
                content: {
                    "application/json": {
                        schema: paginatedDestinationResponseSchema,
                    },
                },
            },
        },
    });


    registry.registerPath({
        method: "post",
        path: "/destinations",
        tags: ["Destinations"],
        summary: "Crear destination",
        description:
            "Requiere JWT con rol ADMIN. Crea un destino desde el panel administrativo.",
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: createDestinationSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Destino creado",
                content: {
                    "application/json": {
                        schema: destinationResponseSchema,
                    },
                },
            },
            400: { description: "Datos inválidos" },
            401: { description: "Token ausente o inválido" },
            403: { description: "Se requiere rol ADMIN" },
            404: { description: "País asociado no encontrado" },
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/destinations/{id}",
        tags: ["Destinations"],
        summary: "Borrar destino",
        description:
            "Requiere JWT con rol ADMIN. Borra un destino desde el panel administrativo.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({ id: z.uuid() }),
        },
        responses: {
            204: { description: "Destino borrado correctamente" },
            400: { description: "No se puede borrar porque tiene paquetes asociados" },
            401: { description: "Token ausente o inválido" },
            403: { description: "Se requiere rol ADMIN" },
            404: { description: "Destino no encontrado" },
        },
    });

    registry.registerPath({
        method: "put",
        path: "/destinations/{id}",
        tags: ["Destinations"],
        summary: "Actualizar Destino",
        description:
            "Requiere JWT con rol ADMIN. Actualiza un destino desde el panel administrativo.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({ id: z.uuid() }),
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: updateDestinationSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Destino actualizado",
                content: {
                    "application/json": {
                        schema: destinationResponseSchema,
                    },
                },
            },
            400: { description: "Datos inválidos" },
            401: { description: "Token ausente o inválido" },
            403: { description: "Se requiere rol ADMIN" },
            404: { description: "Destino no encontrado" },
        },
    });
}