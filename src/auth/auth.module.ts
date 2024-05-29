import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './passport/jwt-access.strategy';
import { JwtRefreshStrategy } from './passport/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    PassportModule.register({ session: false }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
