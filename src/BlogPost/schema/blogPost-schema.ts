import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  author: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
