import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async addUser(info: UserEntity): Promise<UserEntity | void> {
    if (!(await this.findByEmail(info.email))) {
      const user = this.userRepository.create(info);
      return await this.userRepository.save(user);
    } else {
      throw new HttpException('user already exists', 409);
    }
  }

  async deleteUser(email: string): Promise<void> {
    if (await this.findByEmail(email)) {
      await this.userRepository.delete({ email });
    } else {
      throw new HttpException('user not found', 404);
    }
  }

  async updatePassword(email: string, password: string): Promise<void> {
    if (await this.findByEmail(email)) {
      await this.userRepository.update({ email }, { password });
    } else {
      throw new HttpException('user not found', 404);
    }
  }
}
