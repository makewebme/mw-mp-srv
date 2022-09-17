import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'title', type: 'varchar' })
  title: string

  @Column({ name: 'description', type: 'varchar' })
  description: string

  @Column({ name: 'price', type: 'int' })
  price: number

  @Column({ name: 'price_discounted', type: 'int' })
  priceDiscounted: number

  @Column({ name: 'image', type: 'varchar' })
  image: string
}
