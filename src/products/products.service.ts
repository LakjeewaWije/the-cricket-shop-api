import { Injectable } from '@nestjs/common';
import { EnumDto } from 'src/utils/enum.dto';
import { BrandTypes } from './enum/brandTypes.enum';
import { CategoryTypes } from './enum/categoryTypes.enum';
import { StyleTypes } from './enum/styleTypes.enum';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getAllBrandTypes(): Promise<EnumDto[]> {
    try {
      const enumValues = Object.keys(BrandTypes)
        .filter((key) => typeof BrandTypes[key] === 'number')
        .map((key) => ({
          key,
          value: BrandTypes[key],
        }));

      return enumValues;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategoryTypes(): Promise<EnumDto[]> {
    try {
      const enumValues = Object.keys(CategoryTypes)
        .filter((key) => typeof CategoryTypes[key] === 'number')
        .map((key) => ({
          key,
          value: CategoryTypes[key],
        }));

      return enumValues;
    } catch (error) {
      throw error;
    }
  }

  async getAllStyleTypes(): Promise<EnumDto[]> {
    try {
      const enumValues = Object.keys(StyleTypes)
        .filter((key) => typeof StyleTypes[key] === 'number')
        .map((key) => ({
          key,
          value: StyleTypes[key],
        }));

      return enumValues;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const res = await this.productsRepository.find({
        relations: { images: true },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
