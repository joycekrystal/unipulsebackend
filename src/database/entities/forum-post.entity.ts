import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";
import { Forum } from "./forum.entity";
import { User } from "./user.entity";

@Entity()
export class ForumPost extends DateFieldsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  forumId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Forum, (forum) => forum.posts)
  @JoinColumn({ name: "forumId" })
  forum: Forum;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;
}
