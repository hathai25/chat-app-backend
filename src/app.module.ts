import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  AuthModule,
  RelationshipModule,
  RequestModule,
  UserModule,
} from "./modules";

@Module({
  imports: [UserModule, AuthModule, RelationshipModule, RequestModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
