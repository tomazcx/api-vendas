import {ICreateUser} from "@modules/users/domain/models/ICreateUser";
import {IUser} from "@modules/users/domain/models/IUser";
import {IUsersRepository} from "@modules/users/domain/repositories/IUsersRepository";

export class FakeUsersRepository implements IUsersRepository {

	private users: IUser[] = []

	public async find(): Promise<IUser[]> {
		return this.users
	}

	public async findByEmail(email: string): Promise<IUser | undefined> {
		const user = this.users.filter(user => user.email === email)

		return user[0]
	}

	public async findById(id: number): Promise<IUser | undefined> {
		const user = this.users.filter(user => user.id === id)
		return user[0]
	}

	public async create({name, email, password}: ICreateUser): Promise<IUser> {
		const lastId = this.users.length > 0 ? this.users[this.users.length - 1].id : -1

		const user = <IUser>{}
		user.id = lastId + 1
		user.email = email
		user.name = name
		user.password = password

		this.users.push(user)

		return user
	}

	public async save(user: IUser): Promise<IUser> {
		const findIndex = this.users.indexOf(user)
		this.users[findIndex] = user

		return user
	}
}
