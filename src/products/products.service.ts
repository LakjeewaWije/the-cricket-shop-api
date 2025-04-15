import { Injectable } from '@nestjs/common';
import { EnumDto } from 'src/utils/enum.dto';
import { BrandTypes } from './enum/brandTypes.enum';
import { CategoryTypes } from './enum/categoryTypes.enum';
import { StyleTypes } from './enum/styleTypes.enum';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/add-product.dto';
import { Image } from './entity/image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
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

  async addProduct(dto: ProductDto): Promise<Product | any> {
    try {
      const addProductDao: Product = {
        productName: dto.productName,
        productDescription: dto.productDescription,
        productBrand: dto.productBrand,
        status: dto.status,
        productCategory: dto.productCategory,
        price: dto.price,
        productStyle: dto.productStyle,
        weight: dto.weight,
        images: [],
      };

      const res = await this.productsRepository.save(addProductDao);

      for (const image of dto.images as any) {
        let imageDao: Image = {
          product: res,
          url: image,
        };
        await this.imagesRepository.save(imageDao);
      }

      const final = await this.productsRepository.findOne({
        where: {
          productId: res.productId,
        },
        relations: { images: true },
      });

      return final;
    } catch (error) {
      throw error;
    }
  }
}
