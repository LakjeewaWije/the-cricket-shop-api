import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsValidMobileNumber } from 'src/utils/mobileNumber.validator';

export class LoginUserDto {
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
}
