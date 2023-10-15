import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}
}
