import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Order } from './entity/Order'
import { Customer } from './entity/Customer'
import { Product } from './entity/Product'
import { Unit } from './entity/Unit'
import { Config } from './entity/Config'
import { OrderProduct } from './entity/OrderProduct'
import { Contactperson } from './entity/Contactperson'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3308,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  charset: 'utf8',
  synchronize: true,
  logging: false,
  entities: [
    Customer,
    Order,
    Product,
    Unit,
    Config,
    OrderProduct,
    Contactperson,
  ],
  migrations: [],
  subscribers: [],
})
