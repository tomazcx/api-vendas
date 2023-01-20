import bcrypt from 'bcrypt'
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";

import {IUser} from "../domain/models/IUser";
import {IUsersRepository} from '../domain/repositories/IUsersRepository';

interface IRequest {
	name: string
	email: string
	password: string
}

@injectable()
export class CreateUserSerivce {

	constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

	public async execute({name, email, password}: IRequest): Promise<IUser> {

		const emailExists = await this.usersRepository.findByEmail(email)

		if (emailExists) {
			throw new AppError('Email already registered')
		}

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)

		const user = await this.usersRepository.create({name, email, password: hashPassword})

		return user

	}
}
