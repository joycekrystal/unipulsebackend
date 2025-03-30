import { Router } from "express";
import { AnnouncementsController } from "./announcements.controller";

export class AnnouncementsRouter {
  private router: Router;
  private announcementsController: AnnouncementsController;

  constructor() {
    this.router = Router();
    this.announcementsController = new AnnouncementsController();

    this.initializeRoutes();
  }

  get routerRoutes() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/", this.announcementsController.fetchListHandler);
    this.router.get("/:id", this.announcementsController.fetchByIdHandler);
    this.router.patch("/:id", this.announcementsController.updateByIdHandler);
    this.router.delete("/:id", this.announcementsController.deleteByIdHandler);
    this.router.post("/", this.announcementsController.createHandler);
  }
}
