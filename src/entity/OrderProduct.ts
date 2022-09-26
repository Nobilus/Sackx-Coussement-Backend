import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orderId!: number

  @Column()
  productId!: number

  @Column('double', { default: 0 })
  amount: number

  @Column('double', { default: 0 })
  length: number

  @Column('double', { default: 0 })
  thickness: number

  @Column('double', { default: 0 })
  width: number

  @Column('double', { default: 0 })
  price: number

  @Column({ default: undefined })
  remark: string

  @ManyToOne(() => Product, product => product.productOrders, {})
  product!: Product

  @ManyToOne(() => Order, order => order.productOrders, {})
  order!: Order
}
