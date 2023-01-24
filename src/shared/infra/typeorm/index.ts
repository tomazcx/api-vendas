import {Customer} from '@modules/customers/infra/typeorm/entities/Customer';
import {Order} from '@modules/orders/infra/typeorm/entities/Order';
import {OrdersProducts} from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import {Product} from '@modules/products/infra/typeorm/entities/Product';
import {User} from '@modules/users/infra/typeorm/entities/User';
import {UserToken} from '@modules/users/infra/typeorm/entities/UserToken';
import {DataSource} from 'typeorm';

import {CreateProducts1673030829706} from './migrations/1673030829706-CreateProducts';
import {CreateUsers1673283689474} from './migrations/1673283689474-CreateUsers';
import {CreateUserTokens1673384692920} from './migrations/1673384692920-CreateUserTokens';
import {CreateCustomers1673456909458} from './migrations/1673456909458-CreateCustomers';
import {CreateOrders1673489263576} from './migrations/1673489263576-CreateOrders';
import {AddCustomerIdToOrders1673489512519} from './migrations/1673489512519-AddCustomerIdToOrders';
import {CreateOrdersProducts1673490094485} from './migrations/1673490094485-CreateOrdersProducts';
import {AddOrderIdToOrdersProducts1673490385115} from './migrations/1673490385115-AddOrderIdToOrdersProducts';
import {AddProductIdToOrdersProducts1673490772930} from './migrations/1673490772930-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
	type: 'postgres',
	host: 'db',
	port: 5432,
	username: 'postgres',
	password: 'docker',
	database: 'apivendas',
	entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
	migrations: [
		CreateProducts1673030829706,
		CreateUsers1673283689474,
		CreateUserTokens1673384692920,
		CreateCustomers1673456909458,
		CreateOrders1673489263576,
		AddCustomerIdToOrders1673489512519,
		CreateOrdersProducts1673490094485,
		AddOrderIdToOrdersProducts1673490385115,
		AddProductIdToOrdersProducts1673490772930
	],
});
