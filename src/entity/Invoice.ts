import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Customer } from './Customer'
import { Order } from './Order'

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToOne(() => Customer, customer => customer.orders, {
    cascade: true,
    eager: true,
  })
  customer: Customer

  @ManyToMany(() => Order, { eager: true, cascade: true })
  @JoinTable()
  orders: Order[]
}
