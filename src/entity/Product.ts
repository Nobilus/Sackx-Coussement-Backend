import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderProduct } from './OrderProduct'
import { Unit } from './Unit'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('double', { default: 0 })
  price: number

  @Column('double', { default: 0 })
  purchasePrice: number

  @Column('double', { default: 1 })
  length: number

  @Column('double', { default: 1 })
  thickness: number

  @Column('double', { default: 1 })
  width: number

  @ManyToOne(() => Unit, unit => unit.products, { eager: true })
  unit!: Unit

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product, {
    cascade: true,
  })
  productOrders: OrderProduct[]
}
