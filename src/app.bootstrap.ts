import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeApiRoutes } from "@/routers";
import { initializeMiddlewares, GlobalErrorHandlerMiddleware } from "@/middlewares";
import { initializeDatabase } from "@/database";
import { SETTINGS } from "@/configs";
import { AppEnvironments } from "@/types";
import path from "path";
import { ensureUploadDirs } from "@/utils/ensure-upload-dir.util";

dotenv.config();

const app = express();

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(cors());
app.disable("powered-by");

initializeMiddlewares(app);
initializeApiRoutes(app);
initializeDatabase();

app.use(GlobalErrorHandlerMiddleware);

const runApp = (): void => {
  const appPort = SETTINGS.APP_PORT;

  if (!appPort) {
    console.error(`[ERROR]: No app port specified from settings`);
    return;
  }

  app.listen(appPort, () => {
    if (SETTINGS.APP_ENV === AppEnvironments.DEV) {
      console.info(`[APP]: App started and running in ${SETTINGS.APP_URL}`);
    }
  });
};

export { runApp };
