import { Controller } from '@nestjs/common';
import { BlogPostService } from './blogPost.service';

@Controller()
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}
}
