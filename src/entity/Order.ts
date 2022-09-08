import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm'
import { Customer } from './Customer'
import { Product } from './Product'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  date: Date
  @Column()
  orderType: string

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer
}
