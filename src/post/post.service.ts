import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async findById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });
    return post;
  }

  async addPost(info: PostEntity): Promise<PostEntity | void> {
    if (!(await this.findById(info.id))) {
      const post = this.postRepository.create(info);
      return await this.postRepository.save(post);
    } else {
      throw new HttpException('post already exists', 409);
    }
  }

  async deletePost(id: number): Promise<void> {
    if (await this.findById(id)) {
      await this.postRepository.delete({ id });
    } else {
      throw new HttpException('post not found', 404);
    }
  }

  async updateTitle(id: number, title: string): Promise<void> {
    if (await this.findById(id)) {
      await this.postRepository.update({ id }, { title });
    } else {
      throw new HttpException('post not found', 404);
    }
  }
}
