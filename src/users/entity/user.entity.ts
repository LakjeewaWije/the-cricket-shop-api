import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Order } from 'src/orders/entity/order.entity';
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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @Column()
  @PrimaryGeneratedColumn('uuid')
  userId?: UUID;

  @Column({ type: 'varchar', length: 255, default: null })
  firstName?: string;

  @Column({ type: 'varchar', length: 255, default: null })
  lastName?: string;

  @Column('simple-array')
  roles?: string[];

  @Column({ type: 'varchar', length: 255, default: null })
  emailAddress?: string;

  @Column({ type: 'varchar', length: 10 })
  countryCode?: string;

  @Column({ type: 'varchar', length: 15 })
  mobilePhone?: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, default: null })
  password?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  eircode?: string;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  status?: number;

  @Column({ type: 'smallint', nullable: true, default: 0 })
  passwordResetAttempts?: number;

  @Exclude()
  @Column({ type: 'integer', nullable: true, default: null })
  passwordResetPin?: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}
