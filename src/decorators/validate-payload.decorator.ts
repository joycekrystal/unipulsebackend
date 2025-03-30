import { type Request, type Response, type NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode } from "@/types";

export const ValidatePayload = <T extends Object>(dto: new () => T) => {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (request: Request, response: Response, next: NextFunction) {
			const transformedClass = plainToInstance(dto, request.body);
			const errors = await validate(transformedClass);

			if (errors.length) {
				const errorData = errors.map((err) => {
					const { property, constraints } = err;

					return {
						field: property,
						errors: constraints,
					};
				});

				return SendHttpResponse(response, errorData, HttpStatusCode.BAD_REQUEST);
			}

			return originalMethod.apply(this, arguments);
		};
	};
};
