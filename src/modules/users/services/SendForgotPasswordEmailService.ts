import AppError from "@shared/errors/AppError";
import {EtherealMail} from "@config/email/EtherealMail";
import path from 'path'
import {inject, injectable} from "tsyringe";
import {IUserTokensRepository} from "../domain/repositories/IUserTokensRepository";
import {IUsersRepository} from "../domain/repositories/IUsersRepository";

interface IRequest {
	email: string
}

@injectable()
export class SendForgotPasswordEmailService {

	constructor(@inject('UsersRepository') private usersRepository: IUsersRepository,
		@inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository) {}

	public async execute({email}: IRequest): Promise<void> {

		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError("Email not found", 404)
		}

		const {token} = await this.userTokensRepository.generate(user.id)

		const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

		await EtherealMail.sendMail({
			to: {
				name: user.name,
				email: user.email
			},
			subject: '[API Vendas] Recuperação de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
				},

			}
		})

	}
}
