import {isAuthenticated} from '@shared/infra/http/middlewares/isAuthenticated'
import {celebrate, Segments} from 'celebrate'

import {Router} from 'express'
import Joi from 'joi'
import {UserProfileController} from '../controllers/UserProfileController'

const profileController = new UserProfileController()
const profileRouter = Router()

//GET METHODS
profileRouter.get("/show", isAuthenticated, profileController.show)

//PUT METHODS
profileRouter.put("/update",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string(),
			oldPassword: Joi.string().when('password', {is: Joi.exist(), then: Joi.required()}),
			confirmPassword: Joi.string().valid(Joi.ref('password')).when('password', {is: Joi.exist(), then: Joi.required()})
		}
	}), isAuthenticated, profileController.update
)

export default profileRouter
