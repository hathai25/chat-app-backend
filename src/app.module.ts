import { Module } from "@nestjs/common";
import { UserModule } from "./modules/users/user.module";
import { PrismaService } from "./prisma.service";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
