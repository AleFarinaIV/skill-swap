import "./env.js";
import cors from "cors";
import express from "express";
import { healthResponseSchema } from "@skill-swap/shared";

export const app = express();

app.disable("x-powered-by");
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_request, response) => {
  const payload = healthResponseSchema.parse({
    status: "ok",
    service: "skill-swap-api",
  });

  response.status(200).json(payload);
});

app.get("/api/v1", (_request, response) => {
  response.status(200).json({
    name: "Skill Swap API",
    version: "v1",
    status: "scaffold",
  });
});
