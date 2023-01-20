import {UploadAvatarService} from "@modules/users/services/UploadAvatarService";
import AppError from "@shared/errors/AppError";
import {Request, Response} from "express";
import {container} from "tsyringe";


export class UserAvatarController {
	public async update(request: Request, response: Response) {

		if (!request.file) {
			throw new AppError("Missing file")
		}

		const uploadAvatar = container.resolve(UploadAvatarService)

		const id = request.user.id
		const filename = request.file.filename


		const user = await uploadAvatar.execute({
			user_id: id,
			avatarFilename: request.file.filename
		})

		return response.status(200).json({
			status: "Uploaded succesfully",
			filename: filename
		})
	}
}
