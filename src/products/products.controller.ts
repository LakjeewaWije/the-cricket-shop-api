import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/add-product.dto';
import { Public } from 'src/utils/publicRequest.decorator';
import { UUID } from 'crypto';
import { GetProductQueryDto } from './query/get-product.dto';

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

  @ApiOperation({
    summary: 'Add Product',
    description: 'Add product',
  })
  @Post()
  async addProduct(@Body() dto: ProductDto, @Req() req: Request) {
    var res = await this.productsService.addProduct(dto);
    return { product: res };
  }

  @ApiOperation({
    summary: 'Get Single Product Detail',
    description: 'Get single Product detail',
  })
  @Public()
  @Get(`/:productId`)
  async getProductByProductId(@Param('productId') productId: UUID) {
    var res = await this.productsService.getProductByProductId(productId);
    return { product: res };
  }

  @ApiOperation({
    summary: 'Get all products filter',
    description: 'Get all products filter',
  })
  @Public()
  @Get('/get/filter')
  async getAllFilter(@Query() queryParams: GetProductQueryDto) {
    var res = await this.productsService.getAllProductsFilter(queryParams);
    return res;
  }
}
