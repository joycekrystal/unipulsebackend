import { type Response } from "express";

export const SendHttpResponse = <T = any>(response: Response, data: T | null = null, statusCode: number = 200) => {
	response.status(statusCode).json(data);
};
