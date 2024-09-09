import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { UploadModule } from '@upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
  imports: [TypeOrmModule.forFeature([File]), UploadModule],
})
export class CoreModule {}
