import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { UUID } from 'crypto';
import { IsValidMobileNumber } from 'src/utils/mobileNumber.validator';

export class ItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  productId: UUID;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

export class CheckoutDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  recipientFirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  recipientLastName: string;

  @Transform(({ value }) => value.replace(/\s/g, ''))
  @IsString()
  @Validate(IsValidMobileNumber)
  @IsNotEmpty()
  @ApiProperty({
    example: '+353899622517',
  })
  recipientMobilePhone: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  recipientEircode: string;

  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @ApiProperty({ type: () => [ItemDto] })
  items: ItemDto[];
}
