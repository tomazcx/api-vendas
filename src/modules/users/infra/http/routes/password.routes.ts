import {celebrate, Segments} from 'celebrate'
import {Router} from 'express'
import Joi from 'joi'
import {ForgotPasswordController} from '../controllers/ForgotPasswordController'
import {ResetPasswordController} from '../controllers/ResetPasswordController'

const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()
const passwordRouter = Router()

//POST REQUESTS
passwordRouter.post('/forgot', celebrate({
	[Segments.BODY]: {
		email: Joi.string().email().required()
	}
}), forgotPasswordController.create)

passwordRouter.post('/reset',
	celebrate({
		[Segments.BODY]: {
			token: Joi.string().uuid().required(),
			password: Joi.string().required(),
			confirmPassword: Joi.string().required().valid(Joi.ref(('password')))
		}
	}), resetPasswordController.create)

export default passwordRouter

