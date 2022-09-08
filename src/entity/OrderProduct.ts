import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orderId: number

  @Column()
  customerId: number

  @Column('double', { default: 0 })
  amount: number

  @Column('double', { default: 0 })
  price: number

  @ManyToOne(() => Product, product => product.productOrders)
  product: Product

  @ManyToOne(() => Order, order => order.productOrders)
  Order: Order
}
