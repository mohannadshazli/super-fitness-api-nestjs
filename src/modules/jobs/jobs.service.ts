import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class CleanupService implements OnModuleInit {
  constructor(@InjectQueue('cleanup') private queue: Queue) { }

  async onModuleInit() {
    await this.queue.add('clean-cycle', {}, {
      repeat: { every: 60 * 1000 },
    });
  }
  // sechedule job ==> to implement after specific time
  // ttl index ===> check the document
}

