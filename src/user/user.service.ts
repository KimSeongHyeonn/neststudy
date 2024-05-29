import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { UserResponseDto } from './dtos/user.response.dto';
import {
  EmailRequestDto,
  PasswordRequestDto,
  UserRequestDto,
} from './dtos/user.request.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserResponseDto[]> {
    const usersEntity = await this.userRepository.findAll();
    const users = usersEntity.map((user) => new UserResponseDto(user));
    return users;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findByEmail(email);
    return userEntity;
  }

  async findByVal(key: keyof UserEntity, val: any): Promise<UserEntity> {
    const userEntity = this.userRepository.findByVal(key, val);
    return userEntity;
  }

  async addUser(body: UserRequestDto): Promise<UserResponseDto> {
    const newUserEntity = await this.userRepository.create(body);
    const newUser = new UserResponseDto(newUserEntity);
    return newUser;
  }

  async deleteUser(body: EmailRequestDto): Promise<void> {
    await this.userRepository.deleteByEmail(body.email);
  }

  async updatePassword(body: PasswordRequestDto): Promise<void> {
    await this.userRepository.updatePassword(body.email, body.password);
  }

  async updateToken(email: string, token: string): Promise<void> {
    await this.userRepository.updateToken(email, token);
  }
}
