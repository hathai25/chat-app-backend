import { ApiTags } from "@nestjs/swagger";
import { ConversationService } from "./conversation.service";
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreateConversationDto } from "./dtos";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Conversation")
@Controller("conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @Body() createConversationDto: CreateConversationDto
  ): Promise<string> {
    const result = await this.conversationService.createConversation(
      createConversationDto
    );

    return result;
  }

  @Get("list")
  @UseGuards(JwtAuthGuard)
  async listConversation(@Query("userID") userID: string) {
    return await this.conversationService.listConversation(userID);
  }

  @Get("")
  @UseGuards(JwtAuthGuard)
  async getConversation(@Query("id") id: string) {
    return await this.conversationService.getConversation(id);
  }
}
