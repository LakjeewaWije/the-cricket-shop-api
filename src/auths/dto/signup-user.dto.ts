import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsValidMobileNumber } from 'src/utils/mobileNumber.validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'string@gmail.com',
  })
  emailAddress: string;

  @Transform(({ value }) => value.replace(/\s/g, ''))
  @IsString()
  @Validate(IsValidMobileNumber)
  @IsNotEmpty()
  @ApiProperty({
    example: '+353899622517',
  })
  mobilePhone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 7) // Ensuring the Eircode is exactly 7 characters
  @ApiProperty({
    example: 'D02X285',
    description:
      'Eircode should be a valid Irish postal code consisting of 7 characters.',
  })
  eircode: string;
}
