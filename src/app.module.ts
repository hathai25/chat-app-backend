import { Module } from "@nestjs/common";
import { UserModule } from "./modules/users/user.module";
import { PrismaService } from "./prisma.service";
import { AuthModule } from "./modules/auth/auth.module";
import { RelationshipModule } from "./modules/relationship/relationship.module";

@Module({
  imports: [UserModule, AuthModule, RelationshipModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
