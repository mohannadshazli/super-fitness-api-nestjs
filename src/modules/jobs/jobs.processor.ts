import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { OptRepository } from "../auth/reposatories/opt.repository";
import { TokenRepository } from "../auth/reposatories/token.repository";
import type { Job, Queue } from "bull";

@Processor('cleanup')
export class CleanupProcessor {
    constructor(
        private readonly optRepo: OptRepository,
        private readonly tokenRepo: TokenRepository,
        @InjectQueue('cleanup') private queue: Queue,
    ) { }

    @Process('clean-cycle')
    async handleCycle(job: Job) {
        console.log('Running cleanup cycle...');

        await this.optRepo.delete(
            'e.expiresAt < :date',
            { date: new Date() },
        );

        await this.tokenRepo.delete(
            'e.expiresAt < :date',
            { date: new Date() },
        );

        await this.queue.add(
            'clean-cycle',
            {},
            {
                delay: 60 * 1000,
            },
        );
    }
}
