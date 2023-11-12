import { MessageService } from "./modules/message/message.service";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(socket: Socket) {
    await this.messageService.getUserFromSocket(socket);
  }

  @SubscribeMessage("send_message")
  async listenForMessages(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket
  ) {
    const author = await this.messageService.getUserFromSocket(socket);
    const message = await this.messageService.createMessage({
      conversationID: socket.handshake.query.conversationID.toString(),
      attachment: null,
      body: content,
      ownerID: author.id,
    });
    this.server.sockets.emit("receive_message", {
      author,
      content,
    });

    return message;
  }

  @SubscribeMessage("request_all_messages")
  async requestAllMessages(@ConnectedSocket() socket: Socket) {
    await this.messageService.getUserFromSocket(socket);
    const messages = await this.messageService.getMessages(
      socket.handshake.query.conversationID.toString()
    );

    socket.emit("send_all_messages", messages);
  }
}
