import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  Street: string
  @Column()
  Postal: number
  @Column()
  City: string
  @Column()
  VatNumber: string
  @Column()
  Contact1: string
  @Column()
  Contact2: string
  @Column()
  Contact3: string
  @Column()
  Telephone: string
  @Column()
  Remark: string
}
