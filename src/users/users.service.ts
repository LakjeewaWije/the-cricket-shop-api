import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // update own user details
  async updateUser(dto: UpdateUserDto, userId: UUID): Promise<User | any> {
    try {
      let user = await this.usersRepository.findOne({
        where: { userId: userId },
      });

      let hashedPassword = null;
      let validPassword = false;
      if (dto.password && dto.oldPassword) {
        validPassword = await bcrypt.compare(
          dto.oldPassword,
          (user as any).password,
        );

        if (!validPassword)
          throw new BadRequestException('Invalid Old password');

        hashedPassword = await bcrypt.hash(dto.password, 10);
      }

      delete (dto as any).oldPassword;

      const formatUpdateUserDto: User = {
        ...user,
        ...dto,
        password:
          dto.password && validPassword
            ? hashedPassword
            : ((user as any).password as any),
      };

      await this.usersRepository.save(formatUpdateUserDto);

      const updatedUser = await this.usersRepository.findOne({
        where: { userId: userId },
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
