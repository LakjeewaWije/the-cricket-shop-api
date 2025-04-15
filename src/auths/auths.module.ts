import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   global: true,
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get('app.secret'),
    //     signOptions: { expiresIn: 2592000 },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
