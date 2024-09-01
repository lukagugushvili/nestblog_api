import { PartialType } from '@nestjs/swagger';
import { CreateBlogPostDto } from './blogPost-create-dto';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}
