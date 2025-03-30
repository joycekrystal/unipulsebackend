import { type Request, type Response, type NextFunction } from "express";
import { SETTINGS } from "@/configs";
import { SendHttpResponse } from "@/utils";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export const CheckApiKeyMiddleware = (request: Request, response: Response, next: NextFunction) => {
	const header = request.header("X-API-KEY");

	if (!header || header !== SETTINGS.APP_SECRET_KEY) {
		SendHttpResponse(
			response,
			{
				message: HttpErrorTypes.FORBIDDEN_ERROR,
			},
			HttpStatusCode.FORBIDDEN,
		);

		return;
	}

	next();
};
