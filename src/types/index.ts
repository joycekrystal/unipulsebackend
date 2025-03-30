export type OmitDbFields<T> = Omit<T, "id" | "createdAt" | "updatedAt" | "deletedAt">;

export enum AppEnvironments {
	DEV = "DEV",
	QA = "QA",
	PROD = "PROD",
}

export type AppEnvironment = "DEV" | "QA" | "PROD";

export type DbConnectionTypes = "postgres" | "mysql";

export type RequestOtpType = "verify-email" | "reset-password";

export type ListFilterKeys = {
	withDeleted: "true" | "false" | boolean;
};

export enum HttpErrorTypes {
	ALREADY_EXISTS = "ALREADY_EXISTS",
	VALIDATION_ERROR = "VALIDATION_ERROR",
	UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR",
	FORBIDDEN_ERROR = "FORBIDDEN_ERROR",
	NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
	SERVER_ERROR = "SERVER_ERROR",
}

export type HttpErrorType = "VALIDATION_ERROR" | "UNAUTHORIZED_ERROR" | "FORBIDDEN_ERROR" | "SERVER_ERROR";

export enum HttpStatusCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	UNPROCESSABLE_ENTITY = 422,
	INTERNAL_SERVER_ERROR = 500,
}
