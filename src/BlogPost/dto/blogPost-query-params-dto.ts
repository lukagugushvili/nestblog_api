import { IsNotEmpty, IsString } from 'class-validator';

export class BlogPostQueryParamsDto {
  @IsString()
  @IsNotEmpty()
  page?: number;

  @IsString()
  @IsNotEmpty()
  take?: number;
}
