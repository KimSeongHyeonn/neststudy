import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { PostRequestDto } from 'src/post/dtos/post.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async findById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });
    return post;
  }

  async existsById(id: number): Promise<boolean> {
    const post = await this.postRepository.exists({ where: { id } });
    return post;
  }

  async create(info: PostRequestDto): Promise<PostEntity> {
    const post = this.postRepository.create({
      ...info,
      author: { id: info.author },
    });

    return await this.postRepository.save(post);
  }

  async deleteById(id: number): Promise<void> {
    if (await this.existsById(id)) {
      await this.postRepository.delete({ id });
    } else {
      throw new HttpException('post not found', 404);
    }
  }

  async updateContent(
    id: number,
    title: string,
    content: string,
  ): Promise<void> {
    if (await this.existsById(id)) {
      await this.postRepository.update({ id }, { title, content });
    } else {
      throw new HttpException('post not found', 404);
    }
  }
}
