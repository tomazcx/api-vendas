import AppError from '@shared/errors/AppError'
import {sign} from 'jsonwebtoken'
import authConfig from '@config/auth'
import {inject, injectable} from 'tsyringe'
import {IUsersRepository} from '../domain/repositories/IUsersRepository'
import {IHashProvider} from '../providers/HashProvider/models/IHashProvider'
import 'dotenv/config'

interface IRequest {
	email: string
	password: string
}

interface IReturn {
	token: string

}

@injectable()
export class CreateSessionService {

	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('HashProvider') private hashProvider: IHashProvider
	) {}

	public async execute({email, password}: IRequest): Promise<IReturn> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError("Invalid credentials", 401)
		}

		const comparePassword = await this.hashProvider.compareHash(password, user.password)

		if (!comparePassword) {
			throw new AppError("Invalid credentials", 401)
		}

		const secret = authConfig.jwt.secret

		const token = sign({
			name: user.name,
			id: user.id
		}, secret, {
			subject: String(user.id),
			expiresIn: authConfig.jwt.expiresIn
		})

		return {token}





	}
}
