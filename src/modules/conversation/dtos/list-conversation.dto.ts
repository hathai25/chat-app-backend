import { ApiProperty } from "@nestjs/swagger";
import { ConversationType } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsEnum } from "class-validator";

export class ListConversationDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @IsEnum(ConversationType)
  @Expose()
  type: ConversationType;

  @ApiProperty()
  @Expose()
  creatorID: string;

  @ApiProperty()
  Participant: {
    user: {
      id: string;
      username: string;
      avatar: string;
    };
  };
}
