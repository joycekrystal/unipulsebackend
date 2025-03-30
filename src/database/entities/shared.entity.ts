import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class DateFieldsEntity {
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
