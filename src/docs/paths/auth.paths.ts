import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { loginSchema } from "../../dtos/login.dto";
import { createUserSchema } from "../../dtos/createUser.dto";
import { z } from "../../config/zod.config";

export function registerAuthPaths(registry: OpenAPIRegistry) {
    registry.registerPath({
        method: "post",
        path: "/auth/login",
        tags: ["Auth"],
        summary: "Login de usuario",
        request: {
            body: {
                required: true,
                content: {
                    "application/json": {
                        schema: loginSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Login exitoso",
                content: {
                    "application/json": {
                        schema: z.string(),
                    },
                },
            },
            401: {
                description: "Credenciales inválidas",
            },
        },
    });

    registry.registerPath({
        method: "post",
        path: "/auth/register",
        tags: ["Auth"],
        summary: "Registrar usuario",
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
            201: {
                description: "Usuario registrado",
            },
            409: {
                description: "Email ya registrado",
            },
        },
    });
}