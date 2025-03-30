import { IsString, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { AnnouncementEntity } from "@/database/entities";
import { type OmitDbFields } from "@/types";

export type Announcement = OmitDbFields<AnnouncementEntity>;

export class AnnouncementDTO implements Announcement {
  @IsNotEmpty()
  @IsString()
  headline: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
