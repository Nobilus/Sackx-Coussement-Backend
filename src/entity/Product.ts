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
  @Column()
  Thickness: number
  @Column()
  Width: number
  @Column()
  Price: number
  @Column()
  PurchasePrice: number
  @ManyToOne(() => Unit, unit => unit.products)
  unit: Unit
}
