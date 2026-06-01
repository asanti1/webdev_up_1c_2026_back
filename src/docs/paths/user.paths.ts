import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../../config/zod.config";
import { createUserSchema } from "../../dtos/createUser.dto";
import { updateUserSchema } from "../../dtos/updateUser.dto";
import { userResponseSchema } from "../../dtos/userResponse.dto";
import { paginatedUserResponseSchema } from "../../dtos/paginatedUserResponse.dto";

export function registerUserPaths(registry: OpenAPIRegistry) {
    registry.registerPath({
        method: "get",
        path: "/users/",
        tags: ["Users"],
        summary: "Obtener usuarios de forma paginada",
        description: "Ruta solamente utilizable por ADMIN, sirve para obtener usuarios de forma paginada.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({ id: z.uuid() })
        },
        responses: {
            200: {
                description: "Usuario encontrado",
                content: {
                    "application/json": {
                        schema: paginatedUserResponseSchema,
                    },
                },
            },
            401: {
                description: "Token ausente o inválido",
            },
            403: {
                description: "El usuario autenticado no tiene permiso para consultar este endpoint",
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/users/{id}",
        tags: ["Users"],
        summary: "Obtener un usuario por id",
        description: "Requiere JWT. El usuario autenticado solo puede consultar su propio perfil, salvo que tenga rol ADMIN.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({ id: z.uuid() })
        },
        responses: {
            200: {
                description: "Usuario encontrado",
                content: {
                    "application/json": {
                        schema: userResponseSchema,
                    },
                },
            },
            401: {
                description: "Token ausente o inválido",
            },
            403: {
                description: "El usuario autenticado no tiene permiso para consultar este usuario",
            },
            404: {
                description: "Usuario no encontrado",
            },
        },
    });

    registry.registerPath({
        method: "post",
        path: "/users",
        tags: ["Users"],
        summary: "Registrar usuario",
        description: "Ruta solamente utilizable por ADMIN, sirve para crear de forma privada un usuario",
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: createUserSchema,
                    },
                },
            },
        },
        responses: {
            400: {
                description: "Datos inválidos",
            },
            401: {
                description: "Token ausente o inválido",
            },
            403: {
                description: "Se requiere rol ADMIN",
            },
            409: {
                description: "Email ya registrado",
            },
        },
    });

    registry.registerPath({
        method: "put",
        path: "/users/{id}",
        tags: ["Users"],
        summary: "Modificar usuario",
        description: "Requiere JWT. El usuario autenticado solo puede modificar su propio perfil, salvo que tenga rol ADMIN.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({
                id: z.uuid(),
            }),
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: updateUserSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Usuario actualizado",
                content: {
                    "application/json": {
                        schema: userResponseSchema,
                    },
                },
            },
            400: {
                description: "Datos inválidos",
            },
            401: {
                description: "Token ausente o inválido",
            },
            403: {
                description: "El usuario autenticado no tiene permiso para modificar este usuario",
            },
            404: {
                description: "Usuario no encontrado",
            },
        }
    });

    registry.registerPath({
        method: "delete",
        path: "/users/{id}",
        tags: ["Users"],
        summary: "Eliminar usuario por ID",
        description:
            "Requiere JWT. El usuario autenticado solo puede eliminar su propio perfil, salvo que tenga rol ADMIN. La eliminación es lógica.",
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({
                id: z.uuid(),
            }),
        },
        responses: {
            204: {
                description: "Usuario eliminado correctamente",
            },
            401: {
                description: "Token ausente o inválido",
            },
            403: {
                description: "El usuario autenticado no tiene permiso para eliminar este usuario",
            },
            404: {
                description: "Usuario no encontrado",
            },
        },
    });
}