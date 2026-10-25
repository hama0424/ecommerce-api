import { createRoute, z } from "@hono/zod-openapi";

export const healthRoute = createRoute({
  method: "get",
  path: "/health",
  responses: {
    200: {
      description: "Service is healthy",
      content: {
        "application/json": {
          schema: z.object({ status: z.literal("ok") }),
        },
      },
    },
  },
});
