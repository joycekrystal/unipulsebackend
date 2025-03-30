import { type Request } from "express";
import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";

const logFilepath = path.join(__dirname, "./../../logs", "requests.log");

if (!fs.existsSync(path.dirname(logFilepath))) {
	fs.mkdirSync(path.dirname(logFilepath), { recursive: true });
}

morgan.token("custom-date", () => new Date().toISOString());
morgan.token("body", (request: Request) => {
	return JSON.stringify(request.body);
});

const logStream = fs.createWriteStream(logFilepath, { flags: "a" });
const customFormat = "[:custom-date] :method :url :status :body";
const logger = morgan(customFormat, { stream: logStream });

export { logger as RequestsLoggerMiddleware };
