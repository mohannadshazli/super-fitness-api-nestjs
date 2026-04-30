import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CleanupService } from './jobs.service';
import { CleanupProcessor } from './jobs.processor';
import { OptRepository } from '../auth/reposatories/opt.repository';
import { TokenRepository } from '../auth/reposatories/token.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cleanup',
    }),
  ],
  providers: [CleanupService, CleanupProcessor,OptRepository,TokenRepository],
})
export class JobsModule {}
