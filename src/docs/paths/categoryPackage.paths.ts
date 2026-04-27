import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../../config/zod.config";
import { categoryPackageResponseSchema } from "../../dtos/categoryPackageResponse.dto";
import { createCategoryPackageSchema } from "../../dtos/createCategoryPackage.dto";
import { paginatedCategoryPackageResponseSchema } from "../../dtos/paginatedCategoryPackageResponse.dto";
import { updateCategoryPackageSchema } from "../../dtos/updateCategoryPackage.dto";

export function registerCategoryPackagePaths(registry: OpenAPIRegistry) {
    registry.registerPath({
        method: "get",
        path: "/categoryPackages/{id}",
        tags: ["CategoryPackages"],
        summary: "Obtener CategoryPackage por ID",
        request: {
            params: z.object({ id: z.uuid() }),
        },
        responses: {
            200: {
                description: "CategoryPackage encontrado",
                content: {
                    "application/json": {
                        schema: categoryPackageResponseSchema,
                    },
                },
            },
            404: { description: "CategoryPackage no encontrado" },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/categoryPackages",
        tags: ["CategoryPackages"],
        summary: "Obtener categoryPackages paginados",
        request: {
            query: z.object({
                limit: z.coerce.number().int().min(1).max(50).optional(),
                page: z.coerce.number().int().min(1).optional(),
            }),
        },
        responses: {
            200: {
                description: "Lista de categoryPackages encontrados",
                content: {
                    "application/json": {
                        schema: paginatedCategoryPackageResponseSchema,
                    },
                },
            },
        },
    });


    registry.registerPath({
        method: "post",
        path: "/categoryPackages",
        tags: ["CategoryPackages"],
        summary: "Crear categoryPackage",
        description:
            "Requiere JWT con rol ADMIN. Crea un categoryPackage desde el panel administrativo.",
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: createCategoryPackageSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "CategoryPackage creado",
                content: {
                    "application/json": {
                        schema: categoryPackageResponseSchema,
                    },
                },
            },
            400: { description: "Datos inválidos" },
            401: { description: "Token ausente o inválido" },
            403: { description: "Se requiere rol ADMIN" },
            409: { description: "CategoryPackage ya registrado" }
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/categoryPackages/{id}",
        tags: ["CategoryPackages"],
        summary: "Borrar categoryPackage",
        description:
            "Requiere JWT con rol ADMIN. Borra un categoryPackage desde el panel administrativo.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({ id: z.uuid() }),
        },
        responses: {
            204: { description: "CategoryPackage borrado correctamente" },
            400: { description: "No se puede borrar porque tiene paquetes asociados" },
            401: { description: "Token ausente o inválido" },
            403: { description: "Se requiere rol ADMIN" },
            404: { description: "CategoryPackage no encontrado" },
        },
    });

    registry.registerPath({
        method: "put",
        path: "/categoryPackages/{id}",
        tags: ["CategoryPackages"],
        summary: "Actualizar categoryPackage",
        description:
            "Requiere JWT con rol ADMIN. Actualiza un categoryPackage desde el panel administrativo.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({ id: z.uuid() }),
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: updateCategoryPackageSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "CategoryPackage actualizado",
                content: {
                    "application/json": {
                        schema: categoryPackageResponseSchema,
                    },
                },
            },
            400: { description: "Datos inválidos" },
            401: { description: "Token ausente o inválido" },
            403: { description: "Se requiere rol ADMIN" },
            404: { description: "CategoryPackage no encontrado" },
        },
    });
}