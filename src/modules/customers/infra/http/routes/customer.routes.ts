import {celebrate, Segments} from 'celebrate'
import {Router} from 'express'
import Joi from 'joi'
import {CustomersController} from '../controllers/CustomersController'

const customersController = new CustomersController()
const customersRouter = Router()

//GET REQUESTS
customersRouter.get("/all", customersController.index)
customersRouter.get("/:id", celebrate({
	[Segments.PARAMS]: {
		id: Joi.number().integer().required()
	}
}), customersController.show)

//POST METHODS
customersRouter.post("/create", celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().required().email()
	},
}), customersController.create)

//PUT METHODS
customersRouter.put("/update/:id", celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().required().email()
	},
	[Segments.PARAMS]: {
		id: Joi.number().integer().required()
	}
}), customersController.update)

//DELETE METHODS
customersRouter.delete("/:id", celebrate({
	[Segments.PARAMS]: {
		id: Joi.number().integer().required()
	}
}), customersController.delete)


export default customersRouter
