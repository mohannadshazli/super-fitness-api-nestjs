import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../common/types/jwt.type';
import type { AuthenticatedSocket } from './interface/socket';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  handleConnection(client: AuthenticatedSocket) {
    try {
      const auth = client.handshake.auth as { token?: string };
      const token = auth?.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });

      client.data.userId = payload.id;
    } catch (err) {
      console.log(err);
      client.disconnect();
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { message: string; userId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const aiReply = await this.chatService.askAI(
      data.message,
      client.data.userId,
    );

    client.emit('reply', {
      message: aiReply,
    });
  }

  @SubscribeMessage('history')
  async handleHistory(@ConnectedSocket() client: AuthenticatedSocket) {
    const history = await this.chatService.getHistory(client.data.userId);

    client.emit('history', history);
  }
}
