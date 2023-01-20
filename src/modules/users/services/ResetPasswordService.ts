import AppError from "@shared/errors/AppError";
import bcrypt from 'bcrypt'
import {addHours, isAfter} from 'date-fns'
import {inject, injectable} from "tsyringe";
import {IUsersRepository} from "../domain/repositories/IUsersRepository";
import {IUserTokensRepository} from "../domain/repositories/IUserTokensRepository";



interface IRequest {
	token: string;
	password: string
}

@injectable()
export class ResetPasswordService {

	constructor(@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository) {}

	public async execute({password, token}: IRequest): Promise<void> {

		const userToken = await this.userTokensRepository.findByToken(token)

		if (!userToken) {
			throw new AppError('Invalid token', 401)
		}

		const user = await this.usersRepository.findById(userToken.user_id)

		if (!user) {
			throw new AppError('User not found', 404)
		}

		const tokenCreatedAt = userToken.created_at
		const compareDate = addHours(tokenCreatedAt, 2)

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError("Token expired")
		}

		const comparePassword = await bcrypt.compare(password, user.password)

		if (comparePassword) {
			throw new AppError('Password already being used', 422)
		}


		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)

		user.password = hashPassword
		await this.usersRepository.save(user)

		await this.userTokensRepository.deleteByToken(token)


	}
}
