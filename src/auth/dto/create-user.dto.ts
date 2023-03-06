import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

	@IsString()
	@IsEmail()
	@ApiProperty({
		default: 'example@email.com'
	})
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(
		/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'The password must have a Uppercase, lowercase letter and a number'
	})
	@ApiProperty(
		{
			default: 'Password123'
		}
	)
	password: string;

	@IsString()
	@MinLength(1)
	@ApiProperty({
		default: 'name lastName'
	})
	fullName: string;

}