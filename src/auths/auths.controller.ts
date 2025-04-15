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
}
