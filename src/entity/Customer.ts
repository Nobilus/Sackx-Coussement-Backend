import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Contactperson } from './Contactperson'
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
  telephone: string
  @Column({ default: null })
  remark: string

  @OneToMany(() => Order, order => order.customer)
  orders: Order[]

  @OneToMany(() => Contactperson, cp => cp.customer, {
    nullable: true,
    eager: true,
  })
  contactpersons: Contactperson[]
}
