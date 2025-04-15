import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsLatLong,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  emailAddress: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  eircode: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password: string;
}
