import { IsString, IsNotEmpty } from "class-validator";
import { ForumEntity } from "@/database/entities";
import { type OmitDbFields } from "@/types";

export type Forum = OmitDbFields<ForumEntity>;

export class ForumDTO implements Forum {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}