import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOperation({
    summary: 'Get all brand types',
    description: 'Get all brand types',
  })
  @Get('/brand/types')
  async getBrandTypes() {
    var res = await this.productsService.getAllBrandTypes();
    return { brandTypes: res };
  }

  @ApiOperation({
    summary: 'Get all category types',
    description: 'Get all category types',
  })
  @Get('/category/types')
  async getCategoryTypes() {
    var res = await this.productsService.getAllCategoryTypes();
    return { categoryTypes: res };
  }

  @ApiOperation({
    summary: 'Get all style types',
    description: 'Get all style types',
  })
  @Get('/style/types')
  async getStyleTypes() {
    var res = await this.productsService.getAllStyleTypes();
    return { styleTypes: res };
  }

  @ApiOperation({
    summary: 'Get all products',
    description: 'Get all products',
  })
  @Get()
  async getAllProducts() {
    var res = await this.productsService.getAllProducts();
    return { products: res };
  }
}
