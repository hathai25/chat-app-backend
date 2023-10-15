import { ConversationService } from "./conversation.service";
import { Module } from "@nestjs/common";
import { ConversationController } from "./conversation.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService],
})
export class ConversationModule {}
