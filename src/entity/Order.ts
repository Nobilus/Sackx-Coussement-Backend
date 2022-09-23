import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Customer } from './Customer'
import { OrderProduct } from './OrderProduct'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column()
  orderType: string

  @ManyToOne(() => Customer, customer => customer.orders, {
    cascade: true,
  })
  customer: Customer

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product, {
    cascade: true,
  })
  productOrders: OrderProduct[]
}
