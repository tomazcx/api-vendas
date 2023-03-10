import {ICreateUser} from "@modules/users/domain/models/ICreateUser";
import {IUser} from "@modules/users/domain/models/IUser";
import {IUsersRepository} from "@modules/users/domain/repositories/IUsersRepository";
import {getRepository, Repository} from "typeorm";
import {User} from "../entities/User";

export class UsersRepository implements IUsersRepository {

	private ormRepository: Repository<User>

	constructor() {
		this.ormRepository = getRepository(User)
	}

	public async find(): Promise<IUser[]> {
		const users = await this.ormRepository.find()
		return users
	}

	public async findByEmail(email: string): Promise<IUser | undefined> {
		const user = await this.ormRepository.findOne({
			where: {
				email
			}
		})

		return user
	}

	public async findById(id: number): Promise<IUser | undefined> {
		const user = await this.ormRepository.findOne({
			where: {
				id
			}
		})

		return user
	}

	public async create({name, email, password}: ICreateUser): Promise<IUser> {
		const user = this.ormRepository.create({name, email, password})
		await this.ormRepository.save(user)
		return user
	}

	public async save(user: IUser): Promise<IUser> {
		await this.ormRepository.save(user)
		return user
	}
}
