import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryTypes } from '../enum/categoryTypes.enum';
import { BrandTypes } from '../enum/brandTypes.enum';
import { StyleTypes } from '../enum/styleTypes.enum';
import { Image } from './image.entity';
import { OrderToProduct } from 'src/orders/entity/orderToProduct.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @Column()
  @PrimaryGeneratedColumn('uuid')
  productId?: UUID;

  @Column({ type: 'varchar', length: 255, default: null })
  productName?: string;

  @Column({
    type: 'enum',
    enum: CategoryTypes,
    nullable: false,
    default: null,
  })
  productCategory?: CategoryTypes;

  @Column({
    type: 'enum',
    enum: BrandTypes,
    nullable: true,
    default: null,
  })
  productBrand?: BrandTypes;

  @Column({
    type: 'enum',
    enum: StyleTypes,
    nullable: true,
    default: null,
  })
  productStyle?: StyleTypes;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 500, default: null })
  productDescription?: string;

  @Column({ type: 'numeric', nullable: true })
  weight?: number;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  status?: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @OneToMany(() => Image, (image) => image.product)
  images?: Image[];

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.order)
  public orderToProducts?: OrderToProduct[];
}
