import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {

	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column('text', {
		unique: true,
	})
	title: string;


	@ApiProperty()
	@Column('float', {
		default: 0
	})
	price: number;

	@ApiProperty()
	@Column({
		type: 'text',
		nullable: true
	})
	description: string;

	@ApiProperty()
	@Column('text', {
		unique: true
	})
	slug: string;

	@ApiProperty()
	@Column('int', {
		default: 0
	})
	stock: number;

	@ApiProperty({
		type: [String],
		description: 'Array of sizes',
		examples: ['S', 'M', 'L']
	})
	@Column('text', {
		array: true
	})
	sizes: string[];

	@ApiProperty({
		example: "women",
		description: "gender of product"
	})
	@Column('text')
	gender: string;

	@ApiProperty({
		type: [String],
		description: 'Array of tags',
		examples: ['new', 'sale', 'bestseller']
	})
	@Column('text', {
		array: true,
		default: []
	})
	tags: string[];

	@ApiPropertyOptional({
		type: [ProductImage],
		description: 'Array of images'
	})
	// images
	@OneToMany(
		() => ProductImage,
		(productImage) => productImage.product,
		{ cascade: true, eager: true }
	)
	images?: ProductImage[];

	@ManyToOne(
		() => User,
		(user) => user.product,
		{ eager: true }
	)
	user: User

	@BeforeInsert()
	checkSlugInsert() {

		if (!this.slug) {
			this.slug = this.title;
		}

		this.slug = this.slug
			.toLowerCase()
			.replaceAll(' ', '_')
			.replaceAll("'", '')

	}

	@BeforeUpdate()
	checkSlugUpdate() {
		this.slug = this.slug
			.toLowerCase()
			.replaceAll(' ', '_')
			.replaceAll("'", '')
	}


}
