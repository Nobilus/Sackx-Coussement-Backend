import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderProduct } from './OrderProduct'
import { Unit } from './Unit'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('double', { default: 0 })
  thickness: number

  @Column('double', { default: 0 })
  width: number

  @Column('double', { default: 0 })
  price: number

  @Column('double', { default: 0 })
  purchasePrice: number

  @ManyToOne(() => Unit, unit => unit.products)
  unit: Unit

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  productOrders: OrderProduct[]
}
