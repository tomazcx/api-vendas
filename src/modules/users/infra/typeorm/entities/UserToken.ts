import {IUserToken} from "@modules/users/domain/models/IUserToken";
import {Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity('user_tokens')
export class UserToken implements IUserToken {
	@PrimaryColumn('integer')
	id: number

	@Column()
	@Generated('uuid')
	token: string;

	@Column('integer')
	user_id: number

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}
