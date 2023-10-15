import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, PrismaService],
})
export class ParticipantModule {}
