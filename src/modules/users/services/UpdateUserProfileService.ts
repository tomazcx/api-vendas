import AppError from "@shared/errors/AppError"
import bcrypt from 'bcrypt'
import {inject, injectable} from "tsyringe"
import {IUser} from "../domain/models/IUser"
import {IUsersRepository} from "../domain/repositories/IUsersRepository"

interface IRequest {
	name: string
	email: string
	id: number
	password?: string
	oldPassword?: string
}

@injectable()
export class UpdateUserProfileService {

	constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

	public async execute({name, email, id, password, oldPassword}: IRequest): Promise<IUser> {

		const checkIfEmailIsAvailable = await this.usersRepository.findByEmail(email)

		if (checkIfEmailIsAvailable && checkIfEmailIsAvailable.id !== id) {
			throw new AppError("Email already being used", 422)
		}

		const user = await this.usersRepository.findById(id)

		if (!user) {
			throw new AppError("User not found", 404)
		}

		if (password && oldPassword) {

			const verifyCredentials = await bcrypt.compare(oldPassword, user.password)

			if (!verifyCredentials) {
				throw new AppError("Invalid credentials", 422)
			}

			const comparePasswords = await bcrypt.compare(password, user.password)
			if (comparePasswords) {
				throw new AppError("Choose a diferent password", 422)
			}

			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(password, salt)

			user.password = hashPassword


		}

		user.name = name
		user.email = email

		const newUser = await this.usersRepository.save(user)
		return newUser

	}
}
