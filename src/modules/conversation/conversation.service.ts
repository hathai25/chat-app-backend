import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
}
