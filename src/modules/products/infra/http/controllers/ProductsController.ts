import CreateProductService from "@modules/products/services/CreateProductService";
import DeleteProductSerivce from "@modules/products/services/DeleteProductService";
import ListProductService from "@modules/products/services/ListProductService";
import ShowProductService from "@modules/products/services/ShowProductService";
import UpdateProductService from "@modules/products/services/UpdateProductService";
import {Request, Response} from "express";
import {container} from "tsyringe";

export default class ProductsController {

	public async index(request: Request, response: Response): Promise<Response> {
		const listProducts = container.resolve(ListProductService)

		const products = await listProducts.execute()

		return response.status(200).json(products)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const {id} = request.params

		const showProduct = container.resolve(ShowProductService)

		const product = await showProduct.execute(Number(id))

		return response.status(200).json(product)
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const {name, price, quantity} = request.body

		const createProduct = container.resolve(CreateProductService)
		const product = await createProduct.execute({name, price, quantity})

		return response.status(201).json(product)
	}


	public async update(request: Request, response: Response): Promise<Response> {
		const params = request.params

		const id = Number(params.id)

		const {name, price, quantity} = request.body

		const updateProduct = container.resolve(UpdateProductService)
		const product = await updateProduct.execute({id, name, price, quantity})

		return response.status(200).json(product)

	}


	public async delete(request: Request, response: Response): Promise<Response> {
		const {id} = request.params

		const deleteProduct = container.resolve(DeleteProductSerivce)
		await deleteProduct.execute(Number(id))

		return response.status(200).json({
			message: "Product deleted succesfuly"
		})

	}

}
