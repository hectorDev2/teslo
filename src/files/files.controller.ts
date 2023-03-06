import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiConsumes, ApiParam, ApiBody, ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interface/valid-roles.enum';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
@ApiTags('Files')
@ApiResponse({ status: 400, description: 'Bad request.' })
@ApiResponse({ status: 403, description: 'Forbidden. token invalid' })
@ApiResponse({ status: 500, description: 'Internal server error.' })

@ApiBearerAuth('defaultBearerAuth')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) { }

  @Get('product/:imageName')
  @ApiParam({ name: 'imageName', description: 'image name' })
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);
  }



  @Post('product')
  @ApiOperation({
    summary: 'Upload a product image',
    description: 'Upload an image file for a product',
  })
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 1000 }
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'image file to upload',
    type: FileUploadDto,
  })
  @Auth(ValidRoles.user)
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    // const secureUrl = `${ file.filename }`;
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return { secureUrl };
  }

}
