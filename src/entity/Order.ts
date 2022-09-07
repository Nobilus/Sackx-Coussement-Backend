import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  date: Date
  @Column()
  orderType: string
}
