import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from './Product'

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  desc: string
  @OneToMany(() => Product, product => product.unit)
  products: Product[]
}
