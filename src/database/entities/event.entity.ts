import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";

@Entity()
export class Event extends DateFieldsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  image: string;

  @Column({
    nullable: true,
  })
  eventAt?: string;
}
