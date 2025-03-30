import { UsersService } from "@/modules/users/users.service";

export class SystemService {
  public usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public async createAdminAccount() {
    if (await this.usersService.findByEmail("admin@domain.com")) return null;

    const adminUser = await this.usersService.createUser({
      firstName: "System",
      lastName: "Admin",
      email: "admin@domain.com",
      password: "admin",
      studentId: "admin",
    });

    return adminUser;
  }
}
