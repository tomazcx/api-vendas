import {CreateSessionService} from "@modules/users/services/CreateSessionService"
import {Request, Response} from "express"
import {container} from "tsyringe"

export class SessionsController {
	public async login(request: Request, response: Response): Promise<Response> {
		const createSessionServce = container.resolve(CreateSessionService)
		const {email, password} = request.body

		const token = await createSessionServce.execute({email, password})

		return response.status(200).json({
			status: "Authenticated",
			token: token
		})
	}
}
