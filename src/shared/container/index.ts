import {container} from "tsyringe";
import {ICustomersRepository} from "@modules/customers/domain/repositories/ICustomerRepository";
import {CustomersRepository} from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import {IProductRepository} from "@modules/products/domain/repositories/IProductRepository";
import {ProductRepository} from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import {UserTokensRepository} from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import {IOrdersRepository} from "@modules/orders/domain/repositories/IOrdersRepository";
import {OrdersRepository} from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import {UsersRepository} from "@modules/users/infra/typeorm/repositories/UsersRepository";
import {IUsersRepository} from "@modules/users/domain/repositories/IUsersRepository";
import {IUserTokensRepository} from "@modules/users/domain/repositories/IUserTokensRepository";

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository)
container.registerSingleton<IProductRepository>('ProductsRepository', ProductRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository)

