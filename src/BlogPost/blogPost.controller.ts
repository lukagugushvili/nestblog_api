import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogPostService } from './blogPost.service';
import { CreateBlogPostDto } from './dto/blogPost-create-dto';
import { BlogPost } from './schema/blogPost-schema';
import { BlogPostMongoIdDto } from './dto/blogPost-mongo-id-dto';
import { BlogPostQueryParamsDto } from './dto/blogPost-query-params-dto';
import { UpdateBlogPostDto } from './dto/blogPost-update-dto';

@Controller('blogPost')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  create(
    @Body() createBlogPostDto: CreateBlogPostDto,
  ): Promise<CreateBlogPostDto> {
    return this.blogPostService.create(createBlogPostDto);
  }

  @Get('posts')
  getPostsByPagination(
    @Query() blogPostQueryParamsDto: BlogPostQueryParamsDto,
  ): Promise<BlogPost[]> {
    return this.blogPostService.getPostsByPagination(blogPostQueryParamsDto);
  }

  @Get('posts/:id')
  getById(@Param() blogPostMongoIdDto: BlogPostMongoIdDto): Promise<BlogPost> {
    const { id } = blogPostMongoIdDto;
    return this.blogPostService.getById(id);
  }

  @Get()
  getAll(): Promise<BlogPost[]> {
    return this.blogPostService.getAll();
  }

  @Put('posts/:id')
  update(
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @Param() blogPostMongoIdDto: BlogPostMongoIdDto,
  ): Promise<UpdateBlogPostDto> {
    const { id } = blogPostMongoIdDto;
    return this.blogPostService.update(id, updateBlogPostDto);
  }

  @Delete('posts/:id')
  remove(@Param() blogPostMongoIdDto: BlogPostMongoIdDto): Promise<BlogPost> {
    const { id } = blogPostMongoIdDto;
    return this.blogPostService.remove(id)
  }
}
