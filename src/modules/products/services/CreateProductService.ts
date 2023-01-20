import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import {inject, injectable} from "tsyringe";
import {IProductRepository} from "../domain/repositories/IProductRepository";
import {IProduct} from "../domain/models/IProduct";

interface IRequest {
	name: string;
	price: number;
	quantity: number;

}

@injectable()
class CreateProductService {

	constructor(@inject("ProductsRepository") private productRepository: IProductRepository) {}

	public async execute({name, price, quantity}: IRequest): Promise<IProduct> {

		const productsExists = await this.productRepository.findByName(name)

		if (productsExists) {
			throw new AppError("There is already one product with this name")
		}

		const product = await this.productRepository.create({name, price, quantity})

		await RedisCache.invalidate('api-vendas-PRODUCT_LIST')

		return product
	}
}

export default CreateProductService
