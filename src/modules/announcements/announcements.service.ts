import { Announcement } from "./announcements.dto";
import { announcementsRepository } from "@/database";
import { ListFilterKeys } from "@/types";

export class AnnouncementsService {
  public async fetchList(query: ListFilterKeys) {
    return announcementsRepository.find({
      withDeleted: query.withDeleted as boolean,
      order: {
        id: "DESC",
      },
    });
  }

  public async fetchById(id: number) {
    const announcement = announcementsRepository.findOneBy({ id });

    return announcement;
  }

  public async updateById(id: number, data: Announcement) {
    const announcement = await announcementsRepository.update(id, data);

    if (announcement.affected) {
      return await this.fetchById(id);
    }

    return null;
  }

  public async deleteById(id: number) {
    const announcement = announcementsRepository.softDelete(id);

    return announcement;
  }

  public async create(data: Announcement) {
    const announcement = announcementsRepository.create(data);
    await announcementsRepository.save(announcement);

    return announcement;
  }
}
