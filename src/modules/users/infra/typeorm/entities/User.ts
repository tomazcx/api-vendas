import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Exclude, Expose} from "class-transformer";
import {IUser} from "@modules/users/domain/models/IUser";

@Entity('users')
export class User implements IUser {

	@PrimaryColumn('int')
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	avatar: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Expose({name: 'avatar_url'})
	getAvatarUrl(): string | null {
		if (!this.avatar) {
			return null
		}

		return `${process.env.APP_URL}/files/${this.avatar}`
	}

}
