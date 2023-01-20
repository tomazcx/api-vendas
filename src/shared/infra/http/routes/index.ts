import customersRouter from "@modules/customers/infra/http/routes/customer.routes";
import orderRouter from "@modules/orders/infra/http/routes/order.routes";
import productsRouter from "@modules/products/infra/http/routes/products.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import {Router} from "express";

const router = Router()

router.use("/products", productsRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/password', passwordRouter)
router.use('/profile', profileRouter)
router.use("/customers", customersRouter)
router.use("/orders", orderRouter)

export default router
