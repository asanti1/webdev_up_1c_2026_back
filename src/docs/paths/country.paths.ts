import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../../config/zod.config";
import { countryResponseSchema } from "../../dtos/countryResponse.dto";
import { paginatedCountryResponseSchema } from "../../dtos/paginatedCountryResponse.dto";
import { createCountrySchema } from "../../dtos/createCountry.dto";

export function registerCountryPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "get",
    path: "/countries/{id}",
    tags: ["Countries"],
    summary: "Obtener pais por ID",
    request: {
      params: z.object({
        id: z.uuid(),
      }),
    },
    responses: {
      200: {
        description: "Pais encontrado",
        content: {
          "application/json": {
            schema: countryResponseSchema,
          },
        },
      },
      404: {
        description: "Pais no encontrado",
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/countries",
    tags: ["Countries"],
    summary: "Obtener paises paginados",
    request: {
      query: z.object({
	      limit: z.coerce.number().int().min(1).max(50).optional(),
	      page: z.coerce.number().int().min(1).optional(),
      }),
    },
    responses: {
      200: {
        description: "Lista de paises encontrados",
        content: {
          "application/json": {
            schema: paginatedCountryResponseSchema,
          },
        },
      },
    },
  });

  
  registry.registerPath({
    method: "post",
    path: "/countries",
    tags: ["Countries"],
    summary: "Crear pais",
    description:
      "Requiere JWT con rol ADMIN. Crea un pais desde el panel administrativo.",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: createCountrySchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Pais creado",
        content: {
          "application/json": {
            schema: countryResponseSchema,
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
        description: "Se requiere rol ADMIN",
      },
      409: {
        description: "Pais ya registrado",
      },
    },
  });
}