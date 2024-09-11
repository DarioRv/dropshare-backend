import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: configService.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  async upload(file: Express.Multer.File) {
    const folderName = this.configService.getOrThrow('CLOUDINARY_FOLDER_NAME');
    const fileName = file.originalname.split('.')[0];

    const uploading = new Promise<UploadApiResponse>((resolve) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folderName,
            public_id: `${fileName}-${Date.now()}`,
          },
          (error, uploadResult) => {
            if (error) {
              this.logger.error(`Could not upload file, ${error.message}`);
              resolve(null);
            }

            return resolve(uploadResult);
          },
        )
        .end(file.buffer);
    });

    const fileUploaded = await uploading;
    if (!fileUploaded) {
      throw new InternalServerErrorException(
        'No se pudo subir el archivo. ¿Es un archivo multimedia?',
      );
    }

    return fileUploaded.secure_url;
  }
}
