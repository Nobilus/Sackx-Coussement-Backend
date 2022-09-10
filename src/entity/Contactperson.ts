import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Customer } from './Customer'

@Entity()
export class Contactperson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  contactInfo: string

  @ManyToOne(() => Customer, customer => customer.contactpersons)
  customer: Customer
}
