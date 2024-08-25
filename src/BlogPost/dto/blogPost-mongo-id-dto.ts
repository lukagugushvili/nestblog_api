import { IsMongoId, IsString } from 'class-validator';

export class BlogPostMongoIdDto {
  @IsMongoId()
  @IsString()
  id: string;
}
