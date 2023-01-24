import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";

import {IUser} from "../domain/models/IUser";
import {IUsersRepository} from '../domain/repositories/IUsersRepository';
import {IHashProvider} from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
	name: string
	email: string
	password: string
}

@injectable()
export class CreateUserSerivce {

	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('HashProvider') private hashProvider: IHashProvider
	) {}

	public async execute({name, email, password}: IRequest): Promise<IUser> {

		const emailExists = await this.usersRepository.findByEmail(email)

		if (emailExists) {
			throw new AppError('Email already registered')
		}

		const hashPassword = await this.hashProvider.generateHash(password)

		const user = await this.usersRepository.create({name, email, password: hashPassword})

		return user

	}
}
