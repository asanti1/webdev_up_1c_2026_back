import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../../config/zod.config";
import { createPackageSchema } from "../../dtos/createPackage.dto";
import { packageResponseSchema } from "../../dtos/packageResponse.dto";
import { updatePackageSchema } from "../../dtos/updatePackage.dto";

export function registerPackagePaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "get",
    path: "/packages",
    tags: ["Packages"],
    summary: "Obtener paquetes paginados",
    request: {
      query: z.object({
        limit: z.coerce.number().int().min(1).max(50).optional(),
        page: z.coerce.number().int().min(1).optional(),
      }),
    },
    responses: {
      200: {
        description: "Lista de paquetes paginados",
        content: {
          "application/json": {
            schema: packageResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/packages/{id}",
    tags: ["Packages"],
    summary: "Obtener paquete por ID",
    request: {
      params: z.object({
        id: z.uuid(),
      }),
    },
    responses: {
      200: {
        description: "Paquete encontrado",
        content: {
          "application/json": {
            schema: packageResponseSchema,
          },
        },
      },
      400: { description: "Formato de ID inválido" },
      404: { description: "Paquete no encontrado" },
    },
  });

  registry.registerPath({
    method: "post",
    path: "/packages",
    tags: ["Packages"],
    summary: "Crear paquete",
    description:
      "Requiere JWT con rol ADMIN. Crea un paquete turístico asociado a un destino y una categoría.",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: createPackageSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Paquete creado",
        content: {
          "application/json": {
            schema: packageResponseSchema,
          },
        },
      },
      400: { description: "Datos inválidos" },
      401: { description: "Token ausente o inválido" },
      403: { description: "Se requiere rol ADMIN" },
      404: { description: "Destino o categoría no encontrados" },
    },
  });

  registry.registerPath({
    method: "put",
    path: "/packages/{id}",
    tags: ["Packages"],
    summary: "Actualizar paquete",
    description: "Requiere JWT con rol ADMIN. Actualiza un paquete turístico por ID.",
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({
        id: z.uuid(),
      }),
      body: {
        required: true,
        content: {
          "application/json": {
            schema: updatePackageSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Paquete actualizado",
        content: {
          "application/json": {
            schema: packageResponseSchema,
          },
        },
      },
      400: { description: "Datos inválidos o formato de ID inválido" },
      401: { description: "Token ausente o inválido" },
      403: { description: "Se requiere rol ADMIN" },
      404: { description: "Paquete no encontrado" },
    },
  });

  registry.registerPath({
    method: "delete",
    path: "/packages/{id}",
    tags: ["Packages"],
    summary: "Eliminar paquete",
    description:
      "Requiere JWT con rol ADMIN. Realiza una baja lógica del paquete turístico.",
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({
        id: z.uuid(),
      }),
    },
    responses: {
      204: {
        description: "Paquete eliminado correctamente, sin contenido en la respuesta",
      },
      400: { description: "Formato de ID inválido" },
      401: { description: "Token ausente o inválido" },
      403: { description: "Se requiere rol ADMIN" },
      404: { description: "Paquete no encontrado" },
    },
  });
}