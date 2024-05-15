import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import {
  ContentRequestDto,
  IdRequestDto,
  PostRequestDto,
} from './dtos/post.request.dto';
import { PostResponseDto } from './dtos/post.response.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<PostResponseDto[]> {
    return await this.postService.getPosts();
  }

  @Post()
  async addPost(@Body() body: PostRequestDto): Promise<PostResponseDto> {
    return await this.postService.addPost(body);
  }

  @Delete()
  async deletePost(@Body() body: IdRequestDto): Promise<void> {
    return await this.postService.deletePost(body);
  }

  @Get('/find')
  async findById(@Body() body: IdRequestDto): Promise<PostResponseDto> {
    return await this.postService.findById(body);
  }

  @Put('/title')
  async updateTitle(@Body() body: ContentRequestDto): Promise<void> {
    return this.postService.updateContent(body);
  }
}
