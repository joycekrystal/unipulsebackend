import { runApp } from "./src/app.bootstrap";

try {
	runApp();
} catch (error) {
	console.error(`[ERROR]: Failed to start application server`);
}
