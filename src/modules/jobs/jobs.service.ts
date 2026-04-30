import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class CleanupService {
  constructor(@InjectQueue('cleanup') private queue: Queue) {}

  async start() {
    await this.queue.add('clean-cycle', {}, {
      delay: 0, 
    });
  }
}

