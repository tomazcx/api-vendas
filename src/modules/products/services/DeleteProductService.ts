import {getCustomRepository} from "typeorm"
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";
import {ProductRepository} from "../infra/typeorm/repositories/ProductsRepository";
import {inject, injectable} from "tsyringe";
import {IProductRepository} from "../domain/repositories/IProductRepository";

@injectable()
class DeleteProductSerivce {

	constructor(@inject("ProductsRepository") private productRepository: IProductRepository) {}
	public async execute(id: number): Promise<void> {

		const product = await this.productRepository.findById(id)

		if (!product) {
			throw new AppError('Product not found')
		}

		await this.productRepository.deleteById(id)

		await redisCache.invalidate('api-vendas-PRODUCT_LIST')
	}
}

export default DeleteProductSerivce 
