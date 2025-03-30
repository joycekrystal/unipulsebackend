import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";
import { ForumPost } from "./forum-post.entity";

@Entity()
export class Forum extends DateFieldsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @OneToMany(() => ForumPost, (post) => post.forum)
  posts?: ForumPost[];
}
