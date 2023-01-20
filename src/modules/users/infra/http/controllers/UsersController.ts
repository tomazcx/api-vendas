import {CreateUserSerivce} from "@modules/users/services/CreateUserService";
import {ListUserService} from "@modules/users/services/ListUsersService";
import {instanceToInstance} from "class-transformer";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class UserController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listUsersService = container.resolve(ListUserService)
		const users = await listUsersService.execute()

		return response.status(200).json(instanceToInstance(users))

	}

	public async create(request: Request, response: Response): Promise<Response> {
		const createUserService = container.resolve(CreateUserSerivce)
		const {name, email, password} = request.body

		const user = await createUserService.execute({name, email, password})

		return response.status(201).json({
			status: "Account created",
			userId: user.id
		})
	}


}
