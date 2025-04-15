import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CheckoutDto } from './dto/checkout.dto';
import { AuthGuard } from 'src/auths/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Checkout Order',
    description: 'Checkout order',
  })
  @Post(`/checkout`)
  async submitOrder(@Body() dto: CheckoutDto, @Req() req: Request) {
    const userId = req['user'].userId;
    var res = await this.ordersService.checkoutOrder(dto, userId);
    return { order: res };
  }
}
