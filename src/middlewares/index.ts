import { type Application } from "express";
import { CheckApiKeyMiddleware } from "./check-api-key.middleware";
import { RequestsLoggerMiddleware } from "./requests-logger.middleware";
import { ErrorHandlerMiddleware } from "./global-error.middleware";

export const initializeMiddlewares = (app: Application) => {
	// app.use(CheckApiKeyMiddleware);
	app.use(RequestsLoggerMiddleware);
};

export { ErrorHandlerMiddleware as GlobalErrorHandlerMiddleware };
