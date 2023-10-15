import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateConversationDto } from "./dtos";
import { ParticipantService } from "../participant/participant.service";

@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService,
    private participantService: ParticipantService
  ) {}

  async createConversation(
    createConversationDto: CreateConversationDto
  ): Promise<string> {
    const conversation = await this.prisma.conversation.create({
      data: {
        name: createConversationDto.name,
        type: createConversationDto.type,
        creatorID: createConversationDto.creatorID,
      },
    });

    createConversationDto.participantIDs.map(async (participantID) => {
      return await this.participantService.createParticipant(
        conversation.id,
        participantID
      );
    });

    return conversation.id;
  }

  async listConversation(userID: string) {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        Participant: {
          some: {
            userID: userID,
          },
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        creatorID: true,
        Participant: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return conversations;
  }

  async getConversation(id: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        type: true,
        creatorID: true,
        Participant: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return conversation;
  }
}
