import { plainToInstance } from 'class-transformer'
import { Connection } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Config } from '../entity/Config'
import { Customer } from '../entity/Customer'
import { Product } from '../entity/Product'
import { Unit } from '../entity/Unit'
import { csvToJson } from '../utils/helpers'

const seedDb = async () => {
  const dbIsSeeded = await AppDataSource.getRepository(Config).findOne({
    where: { key: 'seeded' },
  })

  if (!dbIsSeeded) {
    const seeded = new Config()
    seeded.key = 'seeded'
    seeded.value = 'true'

    console.log('Seeding...')

    const customers = csvToJson('src/seeding/data/klanten.csv')
    const products = csvToJson('src/seeding/data/producten.csv')
    const units = require('./data/units.json')

    const customerORM = plainToInstance(Customer, customers)
    const productORM = plainToInstance(Product, products)
    const unitORM = plainToInstance(Unit, units)

    await AppDataSource.manager.save(customerORM)
    await AppDataSource.manager.save(productORM)
    await AppDataSource.manager.save(unitORM)

    await AppDataSource.manager.save(seeded)

    console.log('Database has been seeded')
  } else {
    console.log('Database has already been seeded')
  }
}

export default seedDb
