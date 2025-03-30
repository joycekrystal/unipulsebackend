import { type Response } from "express";
import { HttpStatusCode, ListFilterKeys } from "@/types";

export class BaseController {
	protected sendHttpResponse<T = any>(response: Response, data: T | null = null, statusCode: number = HttpStatusCode.OK) {
		return response.status(statusCode).json(data);
	}

	protected bindClassMethods(instance: any) {
		Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
			.filter((key) => typeof instance[key] === "function" && key !== "constructor")
			.forEach((key) => {
				instance[key] = instance[key].bind(instance);
			});
	}

	protected generateListFilters(query: ListFilterKeys) {
		const filters = {
			withDeleted: Boolean(query.withDeleted === "true"),
		};

		return filters;
	}
}
