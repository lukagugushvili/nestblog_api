import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from './schema/blogPost-schema';
import { Model } from 'mongoose';
import { CreateBlogPostDto } from './dto/blogPost-create-dto';
import { BlogPostQueryParamsDto } from './dto/blogPost-query-params-dto';
import { UpdateBlogPostDto } from './dto/blogPost-update-dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class BlogPostService implements OnModuleInit {
  // seeder
  async onModuleInit() {
    try {
      const count = await this.blogPostModel.countDocuments();

      if (count === 0 || count < 10) {
        const postsBox = [];
        for (let i = 0; i < 100; i++) {
          const post: BlogPost = {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(3),
            author: faker.name.fullName(),
          };
          postsBox.push(post);
        }
        await this.blogPostModel.insertMany(postsBox);
      }

      console.log(`Documents count: ${count}`);
    } catch (error) {
      console.log('error initializing module:', error);
    }
  }

  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  // create post
  async create(
    createBlogPostDto: CreateBlogPostDto,
  ): Promise<CreateBlogPostDto> {
    try {
      const createBlog = await this.blogPostModel.create(createBlogPostDto);
      const saveBlog = await createBlog.save();
      return saveBlog;
    } catch (error) {
      console.log('Error creating expenses:', error);
      throw new HttpException(
        'could not save the expense',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // get all posts
  getAll(): Promise<BlogPost[]> {
    return this.blogPostModel.find();
  }

  // get posts by id
  async getById(id: string): Promise<BlogPost> {
    const findPostById = await this.blogPostModel.findById(id).exec();

    if (!findPostById) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return findPostById;
  }

  // get post by pagination
  async getPostsByPagination(
    blogPostQueryParamsDto: BlogPostQueryParamsDto,
  ): Promise<BlogPost[]> {
    const { page = 1, take = 10 } = blogPostQueryParamsDto;

    if (isNaN(page) || isNaN(take) || page < 1 || take < 1) {
      throw new BadRequestException(
        'Invalid pagination parameters. "page" and "take" must be positive numbers.',
      );
    }

    const skip = (page - 1) * take;

    try {
      const posts = await this.blogPostModel
        .find()
        .skip(skip)
        .limit(take)
        .exec();

      if (!posts.length) {
        throw new BadRequestException('no posts found for the given page');
      }

      return posts;
    } catch (error) {
      console.log("Error retrieving paginated posts:', error");
      throw new BadRequestException('Could not retrieve posts.');
    }
  }

  // Update posts by finding id
  async update(
    id: string,
    UpdateBlogPostDto: UpdateBlogPostDto,
  ): Promise<UpdateBlogPostDto> {
    const updateBlog = await this.blogPostModel
      .findByIdAndUpdate(id, UpdateBlogPostDto, { new: true })
      .exec();

    if (!updateBlog) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return updateBlog;
  }

  // delete post with id
  async remove(id: string) {
    const deletePost = await this.blogPostModel.findByIdAndDelete(id);

    if (!deletePost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return deletePost;
  }
}
