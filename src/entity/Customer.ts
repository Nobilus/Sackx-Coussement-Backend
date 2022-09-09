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
  @Column()
  name: string
  @Column({ default: null })
  street: string
  @Column({ default: null })
  postal: string
  @Column({ default: null })
  city: string
  @Column({ default: null })
  vatNumber: string
  @Column({ default: null })
  contact1: string
  @Column({ default: null })
  contact2: string
  @Column({ default: null })
  contact3: string
  @Column({ default: null })
  telephone: string
  @Column({ default: null })
  remark: string

  @OneToMany(() => Order, order => order.customer)
  orders: Order[]
}
