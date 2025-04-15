import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Role } from 'src/role/role.enum';
import { CategoryTypes } from '../enum/categoryTypes.enum';
import { BrandTypes } from '../enum/brandTypes.enum';
import { StyleTypes } from '../enum/styleTypes.enum';

export class GetProductQueryDto {
  @ApiProperty({ required: false, enum: CategoryTypes })
  @IsOptional()
  // @IsEnum(CategoryTypes)
  @IsString()
  productCategory?: CategoryTypes;

  @ApiProperty({ required: false, enum: BrandTypes })
  @IsOptional()
  // @IsEnum(BrandTypes)
  @IsString()
  productBrand?: BrandTypes;

  @ApiProperty({ required: false, enum: StyleTypes })
  @IsOptional()
  // @IsEnum(StyleTypes)
  @IsString()
  productStyle?: StyleTypes;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z]+,(asc|desc)$/i, {
    message: 'Invalid sort parameter. Format should be "field,order".',
  })
  sort?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  pageNumber?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(1000)
  pageSize?: number;
}
