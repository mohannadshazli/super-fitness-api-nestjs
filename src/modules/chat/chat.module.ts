import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './repo/chat-repo';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ChatGateway, ChatService,ChatRepository,JwtService],
})
export class ChatModule {}
