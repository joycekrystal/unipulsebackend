import { Router } from "express";
import { SystemController } from "./system.controller";

export class SystemRouter {
  private router: Router;
  private systemController: SystemController;

  constructor() {
    this.router = Router();
    this.systemController = new SystemController();

    this.initializeRoutes();
  }

  get routerRoutes() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/healthcheck", this.systemController.healthcheckHandler);
    this.router.post("/create-admin-account", this.systemController.createAdminAccountHandler);
  }
}
