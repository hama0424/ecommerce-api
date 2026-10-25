import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRoute } from "./routes/health";

export const app = new OpenAPIHono();

app.openapi(healthRoute, (c) => c.json({ status: "ok" as const }, 200));

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "ecommerce-api", version: "0.1.0" },
});

export default app;
