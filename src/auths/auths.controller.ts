import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { Public } from 'src/utils/publicRequest.decorator';
import { SignUpUserDto } from './dto/signup-user.dto';
import { AuthsService } from './auths.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/entity/user.entity';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authService: AuthsService) {}

  @Public()
  @Post('/signup')
  async signUpUser(@Body() signUpUserDto: SignUpUserDto, @Req() req: Request) {
    var res = await this.authService.signUpUser(signUpUserDto);

    if (!res) {
      throw new BadRequestException(`SignUp failed!, Please try again`);
    }

    return { user: res };
  }

  @Public()
  @Post('/login')
  async logInTrainer(@Body() logInUser: LoginUserDto, @Req() req: Request) {
    var user: User = await this.authService.logInUser(logInUser);

    var tokenPayload: any = {
      userId: user.userId,
      roles: user.roles,
      firstName: user.firstName,
      mobilePhone: user.mobilePhone,
    };

    const jwtToken = await this.authService.generateJWT(tokenPayload, '7d');

    const res = {
      user: user,
      accessToken: jwtToken,
    };

    return res;
  }
}
