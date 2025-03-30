import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EventEntity } from "@/database/entities";
import { type OmitDbFields } from "@/types";

export type Event = OmitDbFields<EventEntity>;

export class EventDTO implements Event {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  eventAt: string;
}
