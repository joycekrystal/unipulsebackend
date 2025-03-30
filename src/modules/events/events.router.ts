import { Router } from "express";
import { EventsController } from "./events.controller";

export class EventsRouter {
  private router: Router;
  private eventsController: EventsController;

  constructor() {
    this.router = Router();
    this.eventsController = new EventsController();
    this.initializeRoutes();
  }

  get routerRoutes() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/", this.eventsController.fetchListHandler);
    this.router.get("/:id", this.eventsController.fetchByIdHandler);
    this.router.patch("/:id", this.eventsController.updateByIdHandler);
    this.router.delete("/:id", this.eventsController.deleteByIdHandler);
    this.router.post("/", this.eventsController.createHandler);
  }
}