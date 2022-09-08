import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Order } from './Order'

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ default: null })
  Name: string
  @Column()
  Street: string
  @Column()
  Postal: string
  @Column()
  City: string
  @Column({ default: null })
  VatNumber: string
  @Column({ default: null })
  Contact1: string
  @Column({ default: null })
  Contact2: string
  @Column({ default: null })
  Contact3: string
  @Column({ default: null })
  Telephone: string
  @Column({ default: null })
  Remark: string

  @OneToMany(() => Order, order => order.customer)
  orders: Order[]
}
