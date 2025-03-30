import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { SystemService } from "./system.service";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode } from "@/types";

export class SystemController extends BaseController {
  public systemService: SystemService;

  constructor() {
    super();

    this.systemService = new SystemService();
    this.bindClassMethods(this);
  }

  public healthcheckHandler(request: Request, response: Response, next: NextFunction): any {
    return SendHttpResponse(response, { status: "online" }, HttpStatusCode.OK);
  }

  public async createAdminAccountHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.systemService.createAdminAccount();

    if (!result) {
      return SendHttpResponse(
        response,
        { status: "ADMIN_ACCOUNT_EXISTS", result },
        HttpStatusCode.UNPROCESSABLE_ENTITY,
      );
    }

    return SendHttpResponse(response, { status: "ADMIN_ACCOUNT_CREATED", result }, HttpStatusCode.CREATED);
  }
}
