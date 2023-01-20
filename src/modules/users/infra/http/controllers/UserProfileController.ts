import {ShowProfileService} from "@modules/users/services/ShowProfileService";
import {UpdateUserProfileService} from "@modules/users/services/UpdateUserProfileService";
import {instanceToInstance} from "class-transformer";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class UserProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		const showProfileService = container.resolve(ShowProfileService)
		const id = request.user.id

		const user = await showProfileService.execute({id})

		return response.status(200).json(instanceToInstance(user))
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const updateUserService = container.resolve(UpdateUserProfileService)
		const {name, email, password, oldPassword} = request.body
		const id = request.user.id

		const user = await updateUserService.execute({name, email, id, password, oldPassword})
		return response.status(200).json({
			status: "Updated data",
			user: {
				name: user.name,
				email: user.email
			}
		})
	}
}
