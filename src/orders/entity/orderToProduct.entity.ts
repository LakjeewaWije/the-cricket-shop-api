import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Product } from 'src/products/entity/product.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderToProduct {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @Column()
  @PrimaryGeneratedColumn('uuid')
  orderToProductId?: UUID;

  @Column({ type: 'numeric', nullable: false })
  public quantity: number;

  @ManyToOne(() => Product, (product) => product.orderToProducts)
  public product: Product;

  @ManyToOne(() => Order, (order) => order.orderToProducts)
  public order: Order;
}
