import AppError from "@shared/errors/AppError";
import {RedisCache} from "@shared/cache/RedisCache";
import {inject, injectable} from "tsyringe";
import {IProductRepository} from "../domain/repositories/IProductRepository";
import {IProduct} from "../domain/models/IProduct";


interface IRequest {
	id: number;
	name: string;
	price: number;
	quantity: number;

}

@injectable()
class UpdateProductService {

	constructor(@inject('ProductsRepository') private productRepository: IProductRepository) {}

	public async execute({id, name, price, quantity}: IRequest): Promise<IProduct> {
		const product = await this.productRepository.findById(id)
		const redisCache = new RedisCache()

		if (!product) {
			throw new AppError("Product not found")
		}

		const checkName = await this.productRepository.findByName(name)

		if (checkName && id !== checkName.id) {
			throw new AppError("Already a product registered with this name. Try another")
		}

		product.name = name ?? product.name
		product.price = price ?? product.price
		product.quantity = quantity ?? product.quantity

		await this.productRepository.save(product)

		await redisCache.invalidate('api-vendas-PRODUCT_LIST')

		return product
	}
}

export default UpdateProductService 
