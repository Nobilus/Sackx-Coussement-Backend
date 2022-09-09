import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Customer } from './Customer'
import { OrderProduct } from './OrderProduct'
import { Product } from './Product'

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
