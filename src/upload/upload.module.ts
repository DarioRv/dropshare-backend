import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UploadService],
  imports: [ConfigModule],
  exports: [UploadService],
})
export class UploadModule {}
