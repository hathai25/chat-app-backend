import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NicknameService {
  constructor(private prisma: PrismaService) {}
}
