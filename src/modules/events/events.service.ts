import dayjs from "dayjs";
import { MoreThanOrEqual } from "typeorm";
import { Event } from "./events.dto";
import { eventsRepository } from "@/database";
import { ListFilterKeys } from "@/types";

export class EventsService {
  public async fetchList(query: ListFilterKeys) {
    return eventsRepository.find({
      withDeleted: query.withDeleted as boolean,
      order: {
        id: "DESC",
      },
    });

    // const currentDate = dayjs().startOf("day").toISOString();

    // return eventsRepository.find({
    //   where: {
    //     eventAt: MoreThanOrEqual(currentDate),
    //   },
    //   withDeleted: query.withDeleted as boolean,
    //   order: {
    //     eventAt: "ASC", // Order by nearest date first
    //   },
    //   take: 2, // Limit to 2 results
    // });
  }

  public async fetchById(id: number) {
    const event = eventsRepository.findOneBy({ id });
    return event;
  }

  public async updateById(id: number, data: Event) {
    const event = await eventsRepository.update(id, data);

    if (event.affected) {
      return await this.fetchById(id);
    }

    return null;
  }

  public async deleteById(id: number) {
    const event = eventsRepository.softDelete(id);
    return event;
  }

  public async create(data: Event) {
    if (data.eventAt) {
      data.eventAt = dayjs(data.eventAt).toISOString();
    }

    const event = eventsRepository.create(data);
    await eventsRepository.save(event);
    return event;
  }
}
