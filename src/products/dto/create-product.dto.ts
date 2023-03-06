import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsIn, IsInt, IsNumber, IsOptional,
  IsPositive, IsString, MinLength
} from 'class-validator';


export class CreateProductDto {


  @ApiProperty({
    description: 'Product title',
    default: 'Product title',
    nullable: false
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product price',
    default: 0,

  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product description',
    default: 'Product description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product slug',
    default: 'product-slug',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product stock',
    default: 0,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Product sizes',
    default: ['S', 'M', 'L'],
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[]

  @ApiProperty({
    description: 'gender of product',
    default: 'unisex'
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product tags',
    default: ['tag1', 'tag2', 'tag3'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Product images',
    default: ['image1', 'image2', 'image3'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
