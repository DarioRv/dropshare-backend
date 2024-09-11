import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { UploadService } from '@upload/upload.service';

@Injectable()
export class CoreService {
  private readonly logger = new Logger(CoreService.name);
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly uploadService: UploadService,
  ) {}

  async saveFile(file: Express.Multer.File) {
    const url = await this.uploadService.upload(file);
    try {
      const fileEntity = this.fileRepository.create({
        name: file.originalname,
        type: file.mimetype.split('/')[1],
        url,
        size: file.size,
      });

      return await this.fileRepository.save(fileEntity);
    } catch (err) {
      this.logger.error(`Could not upload file, ${err}`);
      throw new InternalServerErrorException(
        `No se pudo subir el archivo, ${err}`,
      );
    }
  }

  async getFile(slug: string) {
    const file = await this.fileRepository.findOneBy({ slug });

    if (!file) {
      throw new NotFoundException('Archivo no encontrado');
    }

    return file;
  }
}
