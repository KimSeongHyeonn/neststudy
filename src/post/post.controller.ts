import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from 'src/entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return await this.postService.getPosts();
  }

  @Post()
  async addPost(@Body() info): Promise<PostEntity | void> {
    return await this.postService.addPost(info);
  }

  @Delete()
  async deletePost(@Body() info): Promise<void> {
    return await this.postService.deletePost(info.id);
  }

  @Get('/find')
  async findById(@Body() info): Promise<PostEntity> {
    return await this.postService.findById(info.id);
  }

  @Put('/title')
  async updateTitle(@Body() info): Promise<void> {
    return this.postService.updateTitle(info.id, info.title);
  }
}
