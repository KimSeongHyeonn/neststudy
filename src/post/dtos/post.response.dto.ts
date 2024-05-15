import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PostEntity } from 'src/entities/post.entity';

export class PostResponseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  likes: number;

  @IsNotEmpty()
  @IsNumber()
  author: number;

  constructor(postEntity: PostEntity) {
    this.title = postEntity.title;
    this.content = postEntity.content;
    this.likes = postEntity.likes;
    this.author = postEntity.author.id;
  }
}
