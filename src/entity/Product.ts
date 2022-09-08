import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Unit } from './Unit'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  Name: string

  @Column('double', { default: 0 })
  Thickness: number

  @Column('double', { default: 0 })
  Width: number

  @Column('double', { default: 0 })
  Price: number

  @Column('double', { default: 0 })
  PurchasePrice: number

  @ManyToOne(() => Unit, unit => unit.products, {
    cascade: ['insert', 'update'],
  })
  unit: Unit
}
