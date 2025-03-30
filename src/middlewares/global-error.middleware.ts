import { type Request, type Response, type NextFunction } from "express";
import { SETTINGS } from "@/configs";
import { HttpStatusCode, HttpErrorTypes, AppEnvironments } from "@/types";

const getErrorData = (error: any) => {
	const errType = (statusCode: number) => {
		if (statusCode === HttpStatusCode.BAD_REQUEST) return HttpErrorTypes.VALIDATION_ERROR;
		if (statusCode === HttpStatusCode.UNAUTHORIZED) return HttpErrorTypes.UNAUTHORIZED_ERROR;
		if (statusCode === HttpStatusCode.FORBIDDEN) return HttpErrorTypes.FORBIDDEN_ERROR;
		if (statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) return HttpErrorTypes.SERVER_ERROR;
	};

	if (Array.isArray(error)) {
		return {
			errCode: HttpStatusCode.BAD_REQUEST,
			errType: errType(HttpStatusCode.BAD_REQUEST),
			errMessage: error,
			errTrace: undefined,
		};
	}

	return {
		errCode: error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR,
		errType: errType(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR),
		errMessage: error.message || "INTERNAL_SERVER_ERROR",
		errTrace: SETTINGS.checkCurrentEnvironment(AppEnvironments.DEV) ? error.stack : null,
	};
};

export const ErrorHandlerMiddleware = (error: any, request: Request, response: Response, next: NextFunction) => {
	const { errCode, errType, errMessage, errTrace } = getErrorData(error);

	response.status(errCode).json({
		errCode,
		errType,
		errMessage,
		...(errTrace && { errTrace }),
	});
};
