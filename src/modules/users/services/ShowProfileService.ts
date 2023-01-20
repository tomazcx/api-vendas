import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IUser} from "../domain/models/IUser";
import {IUsersRepository} from "../domain/repositories/IUsersRepository";


interface IRequest {
	id: number
}

@injectable()
export class ShowProfileService {

	constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

	public async execute({id}: IRequest): Promise<IUser> {
		const user = await this.usersRepository.findById(id)

		if (!user) {
			throw new AppError("User not found", 404)
		}

		return user
	}
}
