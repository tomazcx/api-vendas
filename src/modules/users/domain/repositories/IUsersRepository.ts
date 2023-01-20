import {ICreateUser} from "../models/ICreateUser";
import {IUser} from "../models/IUser";

export interface IUsersRepository {
	findByEmail(email: string): Promise<IUser | undefined>
	find(): Promise<IUser[]>
	findById(id: number): Promise<IUser | undefined>
	create(data: ICreateUser): Promise<IUser>
	save(data: IUser): Promise<IUser>
}
