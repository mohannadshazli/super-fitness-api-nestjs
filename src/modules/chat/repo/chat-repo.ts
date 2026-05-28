import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../DB/repositories/abstract.repository";
import { ChatMessage } from "../entity/chat-message.entity";
import { DataSource } from "typeorm";

@Injectable()
export class ChatRepository extends AbstractRepository<ChatMessage> {
    protected readonly entity = ChatMessage;

    constructor(dataSource: DataSource) {
        super(dataSource);
    }
}