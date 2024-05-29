import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dtos/sign.request.dto';
import { RefreshGuard } from 'src/guard/refresh.guard';
import { TokenResponseDto } from './dtos/token.response.dto';
import { JwtPayload } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpRequestDto): Promise<boolean> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInRequestDto): Promise<TokenResponseDto> {
    return await this.authService.signIn(signInDto);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: any): Promise<TokenResponseDto> {
    const { id } = req.user as JwtPayload;
    return await this.authService.refresh(id);
  }
}
