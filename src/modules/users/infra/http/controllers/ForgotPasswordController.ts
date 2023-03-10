import {SendForgotPasswordEmailService} from "@modules/users/services/SendForgotPasswordEmailService";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class ForgotPasswordController {

	public async create(request: Request, response: Response): Promise<Response> {
		const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService)
		const {email} = request.body

		await sendForgotPasswordEmail.execute({
			email
		})

		return response.status(204).json()
	}
}
