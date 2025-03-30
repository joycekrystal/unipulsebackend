import { User } from "./user.dto";
import { usersRepository } from "@/database";
import { encryptPassword } from "@/utils";
import { type SignupData } from "@/modules/auth/auth.dto";

export class UsersService {
  public async findByEmail(email: string): Promise<User | null> {
    const user = await usersRepository.findOneBy({ email });

    return user;
  }

  public async findByStudentId(studentId: string): Promise<User | null> {
    const user = await usersRepository.findOneBy({ studentId });

    return user;
  }

  public async checkExistence(data: SignupData): Promise<boolean> {
    const user = await usersRepository.findOne({
      where: [{ email: data.email }, { studentId: data.studentId }],
    });

    if (user) return true;

    return false;
  }

  public async createUser(data: Partial<User>): Promise<User> {
    const user = usersRepository.create({
      ...data,
      password: await encryptPassword(data.password as string),
    });

    await usersRepository.save(user);

    // @ts-ignore
    delete user.password;

    return user;
  }
}
