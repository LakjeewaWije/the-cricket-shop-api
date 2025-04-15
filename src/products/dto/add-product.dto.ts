import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
} from 'class-validator';
import { UUID } from 'crypto';
import { CategoryTypes } from '../enum/categoryTypes.enum';
import { BrandTypes } from '../enum/brandTypes.enum';
import { StyleTypes } from '../enum/styleTypes.enum';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsEnum(CategoryTypes)
  @IsNotEmpty()
  @ApiProperty()
  productCategory: CategoryTypes;

  @IsEnum(BrandTypes)
  @IsNotEmpty()
  @ApiProperty()
  productBrand?: BrandTypes;

  @IsEnum(StyleTypes)
  @IsOptional()
  @ApiProperty()
  productStyle?: StyleTypes;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  productDescription?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  weight?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  status?: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];
}
