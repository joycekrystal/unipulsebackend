import "reflect-metadata";
import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { AnnouncementsService } from "./announcements.service";
import { ValidateUrlParams, ValidatePayload } from "@/decorators";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode, ListFilterKeys } from "@/types";
import { Announcement, AnnouncementDTO } from "./announcements.dto";

export class AnnouncementsController extends BaseController {
  public announcementsService: AnnouncementsService;

  constructor() {
    super();

    this.announcementsService = new AnnouncementsService();
    this.bindClassMethods(this);
  }

  public async fetchListHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const filtersFromQuery = this.generateListFilters(request.query as ListFilterKeys);
    const result = await this.announcementsService.fetchList(filtersFromQuery);

    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidateUrlParams("id")
  public async fetchByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.announcementsService.fetchById(+request.params?.id);

    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidateUrlParams("id")
  public async updateByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.announcementsService.updateById(+request.params?.id, request.body as Announcement);

    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidateUrlParams("id")
  public async deleteByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.announcementsService.deleteById(+request.params?.id);

    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidatePayload(AnnouncementDTO)
  public async createHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.announcementsService.create(request.body as Announcement);

    if (!result) {
      return SendHttpResponse(response, "INVALID_OR_ALREADY_EXISTS", HttpStatusCode.UNPROCESSABLE_ENTITY);
    }

    return SendHttpResponse(response, result, HttpStatusCode.CREATED);
  }
}
