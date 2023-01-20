import {celebrate, Segments} from 'celebrate'
import {Router} from 'express'
import Joi from 'joi'
import {OrdersController} from '../controllers/OrderController'

const ordersController = new OrdersController()
const orderRouter = Router()

//GET REQUESTS

orderRouter.get("/:id", celebrate({
	[Segments.PARAMS]: {
		id: Joi.number().integer().required()
	}
}), ordersController.show)

//POST REQUESTS

orderRouter.post("/", celebrate({
	[Segments.BODY]: {
		customer_id: Joi.number().integer().required(),
		products: Joi.required()
	}
}), ordersController.create)

export default orderRouter

