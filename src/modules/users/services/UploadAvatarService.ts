import AppError from "@shared/errors/AppError";
import uploadConfig from '@config/upload'
import path from 'path'
import fs from 'fs'
import {inject, injectable} from "tsyringe";
import {IUser} from "../domain/models/IUser";
import {IUsersRepository} from "../domain/repositories/IUsersRepository";

interface IRequest {
	user_id: number;
	avatarFilename: string;
}

@injectable()
export class UploadAvatarService {

	constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

	public async execute({user_id, avatarFilename}: IRequest): Promise<IUser> {
		const user = await this.usersRepository.findById(user_id)

		if (!user) {
			throw new AppError("User not found", 404)
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath)
			}

		}

		user.avatar = avatarFilename

		await this.usersRepository.save(user)

		return user
	}
}
