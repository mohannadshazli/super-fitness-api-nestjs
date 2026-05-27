import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { ChatRepository } from './repo/chat-repo';

@Injectable()
export class ChatService {
  private groq: Groq;

  constructor(private chatRepo: ChatRepository) {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async askAI(message: string, userId: string): Promise<string | null> {
    await this.chatRepo.create({
      userId,
      role: 'user',  // using constant
      content: message,
    });
    const res = await this.groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
    });
    const aiReply: string = res.choices[0]?.message?.content ?? '';
    await this.chatRepo.create({
      userId,
      role: 'assistant',
      content: aiReply,
    });

    return aiReply;
  }
// search about sse server send event
  async getHistory(userId: string) {
    return this.chatRepo.findAll({
      where: 'e.userId = :userId',
      params: { userId },
      orderBy: 'id',
      orderDirection: 'ASC',
    });
  }
}