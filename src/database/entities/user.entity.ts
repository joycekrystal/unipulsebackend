import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";

@Entity()
export class User extends DateFieldsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  userRoleId?: number;

  @Column({
    unique: true,
    nullable: true,
  })
  studentId: string;

  @Column({
    nullable: true,
  })
  studentCourse: string;

  @Column({
    nullable: true,
  })
  studentYearLevel: string;

  @Column()
  firstName: string;

  @Column({
    nullable: true,
  })
  middleName?: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "boolean",
    default: false,
  })
  isAdmin: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  isEnabled: boolean;
}
