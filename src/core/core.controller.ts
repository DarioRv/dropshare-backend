import {
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoreService } from './core.service';

@ApiTags('Files')
@Controller('files')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @ApiResponse({ status: 201, description: 'File uploaded successfuly' })
  @ApiResponse({ status: 400, description: 'File is too large' })
  @ApiResponse({ status: 500, description: 'Could not upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      format: 'binary',
      description: 'File to upload',
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  saveFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
          message: 'File is too large',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.coreService.saveFile(file);
  }

  @ApiResponse({ status: 200, description: 'File found' })
  @ApiResponse({ status: 404, description: 'File not found' })
  @Get(':slug')
  getFile(@Param('slug') slug: string) {
    return this.coreService.getFile(slug);
  }
}
