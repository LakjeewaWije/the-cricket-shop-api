import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signup-user.dto';
import { Role } from 'src/role/role.enum';
import * as bcrypt from 'bcrypt';
import { parsePhoneNumberWithError } from 'libphonenumber-js';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // @Transactional()
  async signUpUser(signUpUserDto: SignUpUserDto): Promise<User | any> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { mobilePhone: signUpUserDto.mobilePhone },
      });

      if (findUser)
        throw new BadRequestException(
          `User with Mobilephone ${signUpUserDto.mobilePhone} already exists!`,
        );

      const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);
      const phoneNumber = parsePhoneNumberWithError(signUpUserDto.mobilePhone);

      //save user intially
      const signUpUserDtoNew: User = {
        ...signUpUserDto,
        countryCode: phoneNumber.countryCallingCode,
        password: hashedPassword,
        roles: [Role.Client],
      };

      await this.usersRepository.save(signUpUserDtoNew);

      const res = await this.usersRepository.findOne({
        where: { mobilePhone: signUpUserDto.mobilePhone },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
