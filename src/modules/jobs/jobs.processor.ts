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
        await this.tokenRepo.delete(
            'expireAt IS NOT NULL AND expireAt < :date',
            { date: new Date().toISOString().split('T').join(' ') },
        );
        await this.optRepo.delete(
            'expiresAt IS NOT NULL AND expiresAt < :date',
            { date: Date.now() },
        );
    }
}
