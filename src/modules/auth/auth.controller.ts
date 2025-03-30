import "reflect-metadata";
import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { AuthService } from "./auth.service";
import {
  SigninCredentialsDTO,
  SigninCredentials,
  SignupDataDTO,
  SignupData,
  AdminSigninCredentialsDTO,
  AdminSigninCredentials,
} from "./auth.dto";
import { ValidatePayload } from "@/decorators";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export class AuthController extends BaseController {
  public authService: AuthService;

  constructor() {
    super();

    this.authService = new AuthService();
    this.bindClassMethods(this);
  }

  @ValidatePayload(AdminSigninCredentialsDTO)
  public async adminSigninHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.authService.signinAdminAccount(request.body as AdminSigninCredentials);

    if (!result) {
      return this.sendHttpResponse(response, HttpErrorTypes.UNAUTHORIZED_ERROR, HttpStatusCode.UNAUTHORIZED);
    }

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidatePayload(SigninCredentialsDTO)
  public async signinHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.authService.signinAccount(request.body as SigninCredentials);

    if (!result) {
      return this.sendHttpResponse(response, HttpErrorTypes.UNAUTHORIZED_ERROR, HttpStatusCode.UNAUTHORIZED);
    }

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  @ValidatePayload(SignupDataDTO)
  public async signupHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.authService.signupAccount(request.body as SignupData);

    if (result.accountExists) {
      return this.sendHttpResponse(response, HttpErrorTypes.ALREADY_EXISTS, HttpStatusCode.UNPROCESSABLE_ENTITY);
    }

    return this.sendHttpResponse(response, result, HttpStatusCode.CREATED);
  }

  public async createAdminHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
    const result = await this.authService.createAdmin();

    return this.sendHttpResponse(response, result, HttpStatusCode.CREATED);
  }
}
