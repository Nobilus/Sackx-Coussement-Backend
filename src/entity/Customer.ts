import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Contactperson } from './Contactperson'
import { Order } from './Order'
import { IsPostalCode } from 'class-validator'

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column({ default: null })
  street: string
  @Column({ default: null })
  @IsPostalCode('BE')
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
    cascade: ['insert', 'update'],
  })
  contactpersons: Contactperson[]
}
