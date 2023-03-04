import { Controller, Post, Body, UseGuards, Get, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { Auth, getRawHeaders, getUser, RoleProtected } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UseRoleGuard } from './guards/use-role.guard';
import { ValidRoles } from './interface/valid-roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
  ) { }



  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testRoutePrivate(
    @Req() request: Express.Request,
  ) {
    console.log(request.user, 'req.user');
    return {
      message: 'This is a private route',
      ok: true,
      user: request.user
    };
  }


  @Get('private2')
  @UseGuards(AuthGuard())
  testRoutePrivate2(
    @getUser() user: User,
    @getRawHeaders() rawHeaders: string[],
    @Headers() headers: string[],

  ) {
    return {
      message: 'This is a private route',
      ok: true,
      user: user,
      rawHeaders: headers
    };
  }


  @Get('private3')
  @SetMetadata('roles', ['admin', 'user'])
  @UseGuards(AuthGuard(), UseRoleGuard)
  testRoutePrivate3(
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

  @Get('private4')
  @RoleProtected('admin', ValidRoles.user)
  @UseGuards(AuthGuard(), UseRoleGuard)
  testRoutePrivate4(
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


  @Get('private5')
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
}
