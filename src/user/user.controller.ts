import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { UserResponseDto } from './dtos/user.response.dto';
import {
  EmailRequestDto,
  PasswordRequestDto,
  UserRequestDto,
} from './dtos/user.request.dto';
import { JwtPayload } from 'src/interfaces/jwt.payload';
import { AccessGuard } from 'src/guard/access.guard';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessGuard)
  async getUser(@Req() req: any): Promise<UserResponseDto> {
    const { id } = req.user as JwtPayload;
    const userEntity = await this.userService.findByVal('id', id);
    return new UserResponseDto(userEntity);
  }

  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getUsers();
  }

  @Post()
  async addUser(@Body() body: UserRequestDto): Promise<UserResponseDto | void> {
    return await this.userService.addUser(body);
  }

  @Delete()
  async deleteUser(@Body() body: EmailRequestDto): Promise<void> {
    return await this.userService.deleteUser(body);
  }

  @Get('find')
  async findByEmail(@Body() body: EmailRequestDto): Promise<UserResponseDto> {
    const userEntity = await this.userService.findByEmail(body.email);
    return new UserResponseDto(userEntity);
  }

  @Put('password')
  async updatePassword(@Body() body: PasswordRequestDto): Promise<void> {
    return await this.userService.updatePassword(body);
  }
}
