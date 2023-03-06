import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';
import { Auth, getUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interface/valid-roles.enum';
import { User } from 'src/auth/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities';

@ApiTags('Products')
@ApiResponse({ status: 400, description: 'Bad request.' })
@ApiResponse({ status: 403, description: 'Forbidden. token invalid' })
@ApiResponse({ status: 500, description: 'Internal server error.' })
@ApiBearerAuth('defaultBearerAuth')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth(ValidRoles.user)
  @ApiBody({ type: [CreateProductDto] })
  @ApiResponse({
    status: 201, description: 'Product was created', type: CreateProductDto
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Product,
  })
  create(
    @Body() createProductDto: CreateProductDto,
    @getUser() user: User,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Auth(ValidRoles.user)
  @ApiCreatedResponse({
    description: 'get all products',
    type: [Product],
  })
  findAll(@Query() paginationDto: PaginationDto,
  ) {
    // console.log(paginationDto)
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiParam({ name: 'term', description: 'search for id or name' })
  @Auth(ValidRoles.user)
  @ApiCreatedResponse({
    description: 'get a product for id or name',
    type: Product,
  })
  findOne(@Param('term') term: string,
    @getUser() user: User,
  ) {
    return this.productsService.findOnePlain(term, user);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'product id to update' })
  @ApiCreatedResponse({
    description: 'updated product',
    type: Product,
  })


  @Auth(ValidRoles.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @getUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'product id to delete' })
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
