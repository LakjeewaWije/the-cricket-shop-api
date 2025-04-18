import { Injectable } from '@nestjs/common';
import { EnumDto } from 'src/utils/enum.dto';
import { BrandTypes } from './enum/brandTypes.enum';
import { CategoryTypes } from './enum/categoryTypes.enum';
import { StyleTypes } from './enum/styleTypes.enum';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, FindManyOptions, Repository } from 'typeorm';
import { ProductDto } from './dto/add-product.dto';
import { Image } from './entity/image.entity';
import { UUID } from 'crypto';
import { GetProductQueryDto } from './query/get-product.dto';

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

  async getProductByProductId(id: UUID): Promise<Product | any> {
    try {
      const res = await this.productsRepository.findOne({
        where: { productId: id },
        relations: { images: true },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsFilter(
    queryParams?: GetProductQueryDto,
  ): Promise<{ products: Product[]; totalCount: number }> {
    const options: FindManyOptions<Product> = {
      relations: { images: true },
    };
    console.log('mannnnn firsttttt');
    if (queryParams) {
      if (queryParams.productBrand) {
        options.where = {
          ...options.where,
          productBrand: queryParams.productBrand,
        };
      }

      if (queryParams.productCategory) {
        options.where = {
          ...options.where,
          productCategory: queryParams.productCategory,
        };
      }

      if (queryParams.productStyle) {
        options.where = {
          ...options.where,
          productStyle: queryParams.productStyle,
        };
      }

      // Apply sorting based on query parameter
      // if (queryParams.sort) {
      //   const [sortField, sortOrder] = queryParams.sort.split(',');
      //   options.order = { [sortField]: sortOrder.toUpperCase() };
      // }

      if (queryParams.pageNumber && queryParams.pageSize) {
        const { pageNumber, pageSize } = queryParams;
        const skip = (pageNumber - 1) * pageSize;
        options.skip = skip;
        options.take = pageSize;
      }
    }

    const [products, totalCount] = await Promise.all([
      this.productsRepository.find(options),
      this.productsRepository.count(options),
    ]);

    return { products: products, totalCount };
  }
}
