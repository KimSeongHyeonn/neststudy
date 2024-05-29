import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRequestDto } from 'src/user/dtos/user.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.exists({ where: { email } });
    return user;
  }

  async create(info: UserRequestDto): Promise<UserEntity> {
    if (!(await this.existsByEmail(info.email))) {
      const user = this.userRepository.create(info);
      return await this.userRepository.save(user);
    } else {
      throw new HttpException('user already exists', 409);
    }
  }

  async deleteByEmail(email: string): Promise<void> {
    if (await this.existsByEmail(email)) {
      await this.userRepository.delete({ email });
    } else {
      throw new HttpException('user not found', 404);
    }
  }

  async updatePassword(email: string, password: string): Promise<void> {
    if (await this.existsByEmail(email)) {
      await this.userRepository.update({ email }, { password });
    } else {
      throw new HttpException('user not found', 404);
    }
  }

  async updateToken(email: string, token: string): Promise<void> {
    if (await this.existsByEmail(email)) {
      await this.userRepository.update({ email }, { token });
    } else {
      throw new HttpException('user not found', 404);
    }
  }

  async findByVal(key: keyof UserEntity, val: any): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { [key]: val },
    });
    return user;
  }
}
