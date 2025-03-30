import { type Request, type Response, type NextFunction } from "express";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode } from "@/types";

type RequiredParams = string | string[];

const checkMissingParams = (requiredParams: RequiredParams, request: Request) => {
	if (Array.isArray(requiredParams)) {
		return requiredParams.filter((param) => !request.params[param]).join(", ");
	}

	return !request.params[requiredParams as string] ? requiredParams : "";
};

export function ValidateUrlParams(requiredParams: RequiredParams) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = function (request: Request, response: Response, next: NextFunction) {
			const missingParams = checkMissingParams(requiredParams, request);

			if (missingParams.length > 0) {
				return SendHttpResponse(response, { error: `Missing parameters: ${missingParams}` }, HttpStatusCode.BAD_REQUEST);
			}

			return originalMethod.apply(this, arguments);
		};
	};
}
