import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, product => product.productOrders)
  product: Product

  @ManyToOne(() => Order, order => order.productOrders)
  Order: Order

  @Column('double', { default: 0 })
  amount: number

  @Column('double', { default: 0 })
  price: number
}
