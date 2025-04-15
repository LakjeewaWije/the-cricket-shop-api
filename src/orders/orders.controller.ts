import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CheckoutDto } from './dto/checkout.dto';
import { AuthGuard } from 'src/auths/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/role/role.enum';
import { UUID } from 'crypto';

@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Checkout Order',
    description: 'Checkout order',
  })
  @Roles(Role.Client)
  @Post(`/checkout`)
  async submitOrder(@Body() dto: CheckoutDto, @Req() req: Request) {
    const userId = req['user'].userId;
    var res = await this.ordersService.checkoutOrder(dto, userId);
    return { order: res };
  }

  @ApiOperation({
    summary: 'Get all products by user',
    description: 'Get all products by user',
  })
  @Roles(Role.Client)
  @Get()
  async getAllOrderByUser(@Req() req: Request) {
    const userId = req['user'].userId;
    var res = await this.ordersService.getAllOrders(userId);
    return { orders: res };
  }

  @ApiOperation({
    summary: 'Get Single Order Detail',
    description: 'Get single order detail',
  })
  @Roles(Role.Client)
  @Get(`/:orderId`)
  async getOrderByOrderId(@Param('orderId') productId: UUID) {
    var res = await this.ordersService.getOrderByOrderId(productId);
    return { order: res };
  }
}
