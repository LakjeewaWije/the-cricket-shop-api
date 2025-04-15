import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryTypes } from '../enum/categoryTypes.enum';
import { BrandTypes } from '../enum/brandTypes.enum';
import { StyleTypes } from '../enum/styleTypes.enum';
import { Product } from './product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @Column()
  @PrimaryGeneratedColumn('uuid')
  imageId?: UUID;

  @Column({ type: 'varchar', length: 255, default: null })
  url?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
