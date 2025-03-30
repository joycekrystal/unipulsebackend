import "reflect-metadata";
import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { ForumsService } from "./forums.service";
import { ValidateUrlParams } from "@/decorators";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode, ListFilterKeys } from "@/types";
import { Forum, ForumDTO } from "./forums.dto";
import multer from "multer";
import path from "path";
import { SETTINGS } from "@/configs";

const storage = multer.diskStorage({
  destination: "./public/uploads/forums",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).single("logo");

export class ForumsController extends BaseController {
  public forumsService: ForumsService;

  constructor() {
    super();
    this.forumsService = new ForumsService();
    this.bindClassMethods(this);
  }

  private getPublicLogoUrl(filename: string): string {
    return `${SETTINGS.APP_URL}/public/uploads/forums/${filename}`;
  }

  public async fetchListHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const filtersFromQuery = this.generateListFilters(request.query as ListFilterKeys);
    const result = await this.forumsService.fetchList(filtersFromQuery);
    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidateUrlParams("id")
  public async fetchByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.forumsService.fetchById(+request.params?.id);
    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidateUrlParams("id")
  public async updateByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    upload(request, response, async (err) => {
      if (err) return SendHttpResponse(response, err, HttpStatusCode.BAD_REQUEST);

      const data = {
        ...request.body,
        logo: request.file ? this.getPublicLogoUrl(request.file.filename) : undefined,
      };

      const result = await this.forumsService.updateById(+request.params?.id, data as Forum);
      return SendHttpResponse(response, result, HttpStatusCode.OK);
    });
  }

  @ValidateUrlParams("id")
  public async deleteByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.forumsService.deleteById(+request.params?.id);
    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }

  public async createHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    upload(request, response, async (err) => {
      if (err) return SendHttpResponse(response, err, HttpStatusCode.BAD_REQUEST);

      if (!request.file) {
        return SendHttpResponse(response, "Logo is required", HttpStatusCode.BAD_REQUEST);
      }

      const data = {
        ...request.body,
        logo: this.getPublicLogoUrl(request.file.filename),
      };

      const result = await this.forumsService.create(data as Forum);
      return SendHttpResponse(response, result, HttpStatusCode.CREATED);
    });
  }

  @ValidateUrlParams("forumId")
  public async createForumPostHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.forumsService.createForumPost(+request.params.forumId, request.body);

    if (!result) {
      return SendHttpResponse(response, "Forum not found", HttpStatusCode.NOT_FOUND);
    }

    return SendHttpResponse(response, result, HttpStatusCode.CREATED);
  }

  @ValidateUrlParams("forumId")
  public async fetchForumPostsHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.forumsService.fetchForumPosts(+request.params.forumId);
    return SendHttpResponse(response, result, HttpStatusCode.OK);
  }
}
