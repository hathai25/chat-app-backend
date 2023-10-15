import { ApiTags } from "@nestjs/swagger";
import { ConversationService } from "./conversation.service";
import { Controller } from "@nestjs/common";

@ApiTags("Conversation")
@Controller("conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) {}
}
