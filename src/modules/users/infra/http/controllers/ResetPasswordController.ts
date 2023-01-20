import {ResetPasswordService} from "@modules/users/services/ResetPasswordService";
import {Request, Response} from "express";
import {container} from "tsyringe";


export class ResetPasswordController {
	public async create(request: Request, response: Response): Promise<Response> {
		const resetPasswordService = container.resolve(ResetPasswordService)
		const {password, token} = request.body

		await resetPasswordService.execute({password, token})

		return response.status(200).json({
			status: "Password changed"
		})
	}
}
