import "./env.js";
import { app } from "./app.js";

const port = Number.parseInt(process.env.API_PORT ?? "4000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error("API_PORT must be a valid TCP port between 1 and 65535.");
}

const server = app.listen(port, () => {
  console.info(`Skill Swap API listening on http://localhost:${port}`);
});

const shutdown = (signal: NodeJS.Signals) => {
  console.info(`${signal} received; shutting down API server.`);
  server.close((error) => {
    if (error) {
      console.error("Error while closing the API server.", error);
      process.exitCode = 1;
    }
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
