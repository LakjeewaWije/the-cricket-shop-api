import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auths/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Update User - Client',
    description: 'Update the user details after logs in',
  })
  @Roles(Role.Client)
  @Put('/update')
  async updateUser(@Body() dto: UpdateUserDto, @Req() req: Request) {
    const userId = req['user'].userId;
    const res = await this.usersService.updateUser(dto, userId);

    return { user: res };
  }
}
