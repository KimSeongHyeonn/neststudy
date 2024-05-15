import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  author: number;
}

export class PostRequestDto extends PickType(PostDto, [
  'title',
  'content',
  'author',
] as const) {}

export class ContentRequestDto extends PickType(PostDto, [
  'id',
  'title',
  'content',
] as const) {}

export class IdRequestDto extends PickType(PostDto, ['id'] as const) {}
