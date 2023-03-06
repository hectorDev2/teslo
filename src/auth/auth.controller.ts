import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth, getUser } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interface/valid-roles.enum';

@ApiTags('Register/Login')
@ApiResponse({ status: 400, description: 'Bad request.' })
@ApiResponse({ status: 403, description: 'Forbidden. token invalid' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
  ) { }



  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201, description: 'Register user is successfully', type: CreateUserDto
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'The user has been successfully logged in',
    type: User,
  })
  @ApiBody({ type: LoginUserDto })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @Auth(ValidRoles.user)
  testRoutePrivate5(
    @getUser() user: User,
    @Headers() headers: string[],
  ) {
    return {
      message: 'This is a private route',
      ok: true,
      user,
      headers
    };
  }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testRoutePrivate(
  //   @Req() request: Express.Request,
  // ) {
  //   console.log(request.user, 'req.user');
  //   return {
  //     message: 'This is a private route',
  //     ok: true,
  //     user: request.user
  //   };
  // }


  // @Get('private2')
  // @UseGuards(AuthGuard())
  // testRoutePrivate2(
  //   @getUser() user: User,
  //   @getRawHeaders() rawHeaders: string[],
  //   @Headers() headers: string[],

  // ) {
  //   return {
  //     message: 'This is a private route',
  //     ok: true,
  //     user: user,
  //     rawHeaders: headers
  //   };
  // }


  // @Get('private3')
  // @SetMetadata('roles', ['admin', 'user'])
  // @UseGuards(AuthGuard(), UseRoleGuard)
  // testRoutePrivate3(
  //   @getUser() user: User,
  //   @Headers() headers: string[],
  // ) {
  //   return {
  //     message: 'This is a private route',
  //     ok: true,
  //     user,
  //     headers
  //   };
  // }

  // @Get('private4')
  // @RoleProtected('admin', ValidRoles.user)
  // @UseGuards(AuthGuard(), UseRoleGuard)
  // testRoutePrivate4(
  //   @getUser() user: User,
  //   @Headers() headers: string[],
  // ) {
  //   return {
  //     message: 'This is a private route',
  //     ok: true,
  //     user,
  //     headers
  //   };
  // }


  // @Get('private5')
  // @Auth(ValidRoles.user)
  // testRoutePrivate5(
  //   @getUser() user: User,
  //   @Headers() headers: string[],
  // ) {
  //   return {
  //     message: 'This is a private route',
  //     ok: true,
  //     user,
  //     headers
  //   };
  // }
}
