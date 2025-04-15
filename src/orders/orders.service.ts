import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { CheckoutDto } from './dto/checkout.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/product.entity';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { User } from 'src/users/entity/user.entity';
import { OrderToProduct } from './entity/orderToProduct.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(OrderToProduct)
    private orderToProductRepository: Repository<OrderToProduct>,
  ) {}

  @Transactional()
  async checkoutOrder(dto: CheckoutDto, userId: UUID): Promise<any> {
    try {
      // get user
      const getUser = await this.usersRepository.findOne({
        where: { userId },
      });

      if (!getUser) throw new NotFoundException('User Not Found');

      // add order

      const orderDao: Order = {
        user: getUser,
        recipientFirstName: dto.recipientFirstName,
        recipientLastName: dto.recipientLastName,
        recipientMobilePhone: dto.recipientMobilePhone,
        recipientEircode: dto.recipientEircode,
      };

      const orderRes = await this.ordersRepository.save(orderDao);
      let total = 0;
      for (const item of dto.items) {
        const productRes = await this.productsRepository.findOne({
          where: { productId: item.productId },
        });

        if (!productRes) throw new NotFoundException('Product Not Found');

        total = total + parseFloat(productRes.price.toString()) * item.quantity;

        const orderToProductDao: OrderToProduct = {
          quantity: item.quantity,
          product: productRes,
          order: orderRes,
        };

        await this.orderToProductRepository.save(orderToProductDao);
      }

      await this.ordersRepository.save({
        ...orderRes,
        total,
      });

      const res = await this.ordersRepository.find({
        where: { orderId: orderRes.orderId },
        relations: { user: true, orderToProducts: { product: true } },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders(userId: UUID): Promise<Order[]> {
    try {
      const res = await this.ordersRepository.find({
        where: { user: { userId } },
        relations: { orderToProducts: { product: true } },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getOrderByOrderId(id: UUID): Promise<Order | any> {
    try {
      const res = await this.ordersRepository.findOne({
        where: { orderId: id },
        relations: {
          orderToProducts: { product: true },
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
