import {Router} from 'express'

import {celebrate, Joi, Segments} from 'celebrate'
import ProductsController from '../controllers/ProductsController'
import {isAuthenticated} from '@shared/infra/http/middlewares/isAuthenticated'

const productsRouter = Router()
const productsController = new ProductsController()

//GET REQUESTS
productsRouter.get("/all", productsController.index)

productsRouter.get("/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.number().integer().required()
		}
	}),
	productsController.show)

//POST REQUESTS
productsRouter.post("/create",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().integer().required()
		}
	}),
	isAuthenticated,
	productsController.create)

//PUT REQUESTS
productsRouter.put("/update/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.number().integer().required()
		}
	}),
	isAuthenticated,
	productsController.update)

//DELETE REQUESTS
productsRouter.delete("/delete/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.number().integer().required()
		}
	}),
	isAuthenticated,
	productsController.delete)

export default productsRouter
