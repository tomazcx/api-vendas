import 'express-async-errors'
import {errors} from 'celebrate'
import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import router from './routes/index'
import AppError from '../../errors/AppError'
import '../typeorm/index'
import '@shared/container'
import uploadConfig from '@config/upload'
import {rateLimiter} from './middlewares/rateLimiter'
const app = express()

app.use(express.json())
app.use(cors())
app.use(rateLimiter)

app.use("/", router)

app.use(errors())
app.use('/files', express.static(uploadConfig.directory))

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message
		})
	}

	console.log(error)

	return res.status(500).json({
		status: 'error',
		message: "Internal server error"
	})

})

export {app}
