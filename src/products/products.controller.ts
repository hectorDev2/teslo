import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';
import { Auth, getUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interface/valid-roles.enum';
import { User } from 'src/auth/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth(ValidRoles.user)
  create(
    @Body() createProductDto: CreateProductDto,
    @getUser() user: User,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Auth(ValidRoles.user)
  findAll(@Query() paginationDto: PaginationDto,
  ) {
    // console.log(paginationDto)
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth(ValidRoles.user)
  findOne(@Param('term') term: string,
    @getUser() user: User,
  ) {
    return this.productsService.findOnePlain(term, user);
  }

  @Patch(':id')
  @Auth(ValidRoles.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @getUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
