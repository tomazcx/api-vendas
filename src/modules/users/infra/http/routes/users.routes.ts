import {Joi, celebrate, Segments} from "celebrate";
import {Router} from "express";
import multer from "multer";
import uploadConfig from '@config/upload'
import {UserAvatarController} from "../controllers/UserAvatarController";
import {UserController} from "../controllers/UsersController";
import {isAuthenticated} from "@shared/infra/http/middlewares/isAuthenticated";

const avatarController = new UserAvatarController()
const userController = new UserController()
const usersRouter = Router()
const upload = multer(uploadConfig)

//GET METHODS
usersRouter.get("/all", userController.index)

//POST METHODS
usersRouter.post("/create",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			confirmPassword: Joi.string().required().valid(Joi.ref('password'))
		}
	}),
	userController.create)

//PATCH METHODS
usersRouter.patch("/avatar", isAuthenticated, upload.single('avatar'), avatarController.update)

export default usersRouter
