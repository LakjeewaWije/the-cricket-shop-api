import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderToProduct } from './entity/orderToProduct.entity';
import { User } from 'src/users/entity/user.entity';
import { Product } from 'src/products/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderToProduct, User, Product])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
