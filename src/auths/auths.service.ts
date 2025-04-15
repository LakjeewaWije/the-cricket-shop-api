import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signup-user.dto';
import { Role } from 'src/role/role.enum';
import * as bcrypt from 'bcrypt';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // @Transactional()
  async signUpUser(dto: SignUpUserDto): Promise<User | any> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { mobilePhone: dto.mobilePhone },
      });

      if (findUser)
        throw new BadRequestException(
          `User with Mobilephone ${dto.mobilePhone} already exists!`,
        );

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const phoneNumber = parsePhoneNumberWithError(dto.mobilePhone);

      //save user intially
      const signUpUserDtoNew: User = {
        ...dto,
        countryCode: phoneNumber.countryCallingCode,
        password: hashedPassword,
        roles: [Role.Client],
      };

      await this.usersRepository.save(signUpUserDtoNew);

      const res = await this.usersRepository.findOne({
        where: { mobilePhone: dto.mobilePhone },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async logInUser(dto: LoginUserDto): Promise<User> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { mobilePhone: dto.mobilePhone },
      });

      if (!findUser)
        throw new NotFoundException(
          `User with Mobilephone ${dto.mobilePhone} not found!`,
        );

      const validPassword = await this.comparePasswords(
        dto.password,
        findUser.password as any,
      );

      if (!validPassword)
        throw new UnauthorizedException('Invalid Credentials');

      return findUser;
    } catch (error) {
      throw error;
    }
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async generateJWT(payload: any, expiresIn: number | string): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        expiresIn: expiresIn,
        // issuer: 'cricketshop.com',
      });
    } catch (error) {
      throw error;
    }
  }
}
