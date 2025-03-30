import JWT from "jsonwebtoken";
import { UsersService } from "@/modules/users/users.service";
import { RequestOtp, type SigninCredentials, type SignupData, type AdminSigninCredentials } from "./auth.dto";
import { verifyPassword } from "@/utils";
import { SETTINGS } from "@/configs";
import { User } from "@/modules/users/user.dto";
export class AuthService {
  public usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public async createAdmin() {
    const createUser = await this.usersService.createUser({
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.com",
      password: "admin",
      isAdmin: true,
      isEnabled: true,
    } as User);
    delete (createUser as any).password;

    return {
      accountExists: false,
      user: createUser,
    };
  }

  public async signinAccount(credentials: SigninCredentials) {
    const user = await this.usersService.findByStudentId(credentials.studentId);
    const isPasswordVerified = user ? await verifyPassword(credentials.password, user?.password) : false;

    if (!user || !isPasswordVerified) {
      return null;
    }

    delete (user as any).password;
    const authToken = JWT.sign({ user }, SETTINGS.APP_JWT_SECRET_KEY, { expiresIn: "1h" });

    return {
      user,
      authToken,
    };
  }

  public async signinAdminAccount(credentials: AdminSigninCredentials) {
    const user = await this.usersService.findByEmail(credentials.email);
    const isPasswordVerified = user ? await verifyPassword(credentials.password, user?.password) : false;

    if (!user || !isPasswordVerified) {
      return null;
    }

    delete (user as any).password;
    const authToken = JWT.sign({ user }, SETTINGS.APP_JWT_SECRET_KEY, { expiresIn: "1h" });

    return {
      user,
      authToken,
    };
  }

  public async signupAccount(accountData: SignupData) {
    const isUserExist = await this.usersService.checkExistence(accountData);

    if (isUserExist) {
      return {
        accountExists: true,
      };
    }

    const createUser = await this.usersService.createUser(accountData as User);
    delete (createUser as any).password;

    return {
      accountExists: false,
      user: createUser,
    };
  }

  public async requestOtp(data: RequestOtp) {
    //
  }
}
