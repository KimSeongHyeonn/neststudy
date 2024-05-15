import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { PostResponseDto } from './dtos/post.response.dto';
import {
  ContentRequestDto,
  IdRequestDto,
  PostRequestDto,
} from './dtos/post.request.dto';
import { PostRepository } from 'src/repositories/post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: PostRepository,
  ) {}

  async getPosts(): Promise<PostResponseDto[]> {
    const postEntitiess = await this.postRepository.findAll();
    const posts = postEntitiess.map((post) => new PostResponseDto(post));
    return posts;
  }

  async findById(body: IdRequestDto): Promise<PostResponseDto> {
    const postEntity = await this.postRepository.findById(body.id);
    const post = new PostResponseDto(postEntity);
    return post;
  }

  async addPost(body: PostRequestDto): Promise<PostResponseDto> {
    const newPostEntity = await this.postRepository.create(body);
    const newPost = new PostResponseDto(newPostEntity);
    return newPost;
  }

  async deletePost(body: IdRequestDto): Promise<void> {
    await this.postRepository.deleteById(body.id);
  }

  async updateContent(body: ContentRequestDto): Promise<void> {
    await this.postRepository.updateContent(body.id, body.title, body.content);
  }
}
