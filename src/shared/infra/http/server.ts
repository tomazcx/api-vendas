import 'reflect-metadata'
import 'dotenv/config'
import {app} from './app'
import {dataSource} from '../typeorm'

dataSource.initialize().then(() => {
	app.listen(3000, () => console.log('Servidor iniciado na porta 3000'))
})

