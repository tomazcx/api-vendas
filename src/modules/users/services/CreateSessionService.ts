import AppError from '@shared/errors/AppError'
import bcrypt from 'bcrypt'
import {sign} from 'jsonwebtoken'
import authConfig from '@config/auth'
import {inject, injectable} from 'tsyringe'
import {IUsersRepository} from '../domain/repositories/IUsersRepository'



interface IRequest {
	email: string
	password: string
}

@injectable()
export class CreateSessionService {

	constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

	public async execute({email, password}: IRequest): Promise<string> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError("Invalid credentials", 401)
		}

		const comparePassword = await bcrypt.compare(password, user.password)

		if (!comparePassword) {
			throw new AppError("Invalid credentials", 401)
		}

		const token = sign({
			name: user.name,
			id: user.id
		}, authConfig.jwt.secret, {
			subject: String(user.id),
			expiresIn: authConfig.jwt.expiresIn
		})

		return token


	}
}
