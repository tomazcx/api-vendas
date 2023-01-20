import {getCustomRepository} from "typeorm"
import redisCache from "@shared/cache/RedisCache"
import {Product} from "../infra/typeorm/entities/Product"
import {ProductRepository} from "../infra/typeorm/repositories/ProductsRepository"
import {inject, injectable} from "tsyringe"
import {IProductRepository} from "../domain/repositories/IProductRepository"
import {IProduct} from "../domain/models/IProduct"

@injectable()
class ListProductService {

	constructor(@inject("ProductsRepository") private productRepository: IProductRepository) {}

	public async execute(): Promise<IProduct[]> {
		let products = await redisCache.recover<IProduct[]>('api-vendas-PRODUCT_LIST')

		if (!products) {
			products = await this.productRepository.find()
			await redisCache.save('api-vendas-PRODUCT_LIST', products)
		}
		return products
	}
}

export default ListProductService
