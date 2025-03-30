import "reflect-metadata";
import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { EventsService } from "./events.service";
import { ValidateUrlParams, ValidatePayload } from "@/decorators";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode, ListFilterKeys } from "@/types";
import { Event, EventDTO } from "./events.dto";
import multer from "multer";
import path from "path";
import { SETTINGS } from "@/configs";

const storage = multer.diskStorage({
  destination: "./public/uploads/events",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).single("image");

export class EventsController extends BaseController {
  public eventsService: EventsService;

  constructor() {
    super();
    this.eventsService = new EventsService();
    this.bindClassMethods(this);
  }

  private getPublicImageUrl(filename: string): string {
    return `${SETTINGS.APP_URL}/public/uploads/events/${filename}`;
  }

  public async fetchListHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const filtersFromQuery = this.generateListFilters(request.query as ListFilterKeys);
    const result = await this.eventsService.fetchList(filtersFromQuery);
    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidateUrlParams("id")
  public async fetchByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.eventsService.fetchById(+request.params?.id);
    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidateUrlParams("id")
  public async updateByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    upload(request, response, async (err) => {
      if (err) return SendHttpResponse(response, err, HttpStatusCode.BAD_REQUEST);

      const data = {
        ...request.body,
        image: request.file ? this.getPublicImageUrl(request.file.filename) : undefined,
      };

      const result = await this.eventsService.updateById(+request.params?.id, data as Event);
      return SendHttpResponse(response, result, HttpStatusCode.OK);
    });
  }

  @ValidateUrlParams("id")
  public async deleteByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.eventsService.deleteById(+request.params?.id);
    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  public async createHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    upload(request, response, async (err) => {
      if (err) return SendHttpResponse(response, err, HttpStatusCode.BAD_REQUEST);

      if (!request.file) {
        return SendHttpResponse(response, "Image is required", HttpStatusCode.BAD_REQUEST);
      }

      const data = {
        ...request.body,
        image: this.getPublicImageUrl(request.file.filename),
      };

      const result = await this.eventsService.create(data as Event);
      return SendHttpResponse(response, result, HttpStatusCode.CREATED);
    });
  }
}
