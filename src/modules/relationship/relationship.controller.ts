import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { RelationshipService } from "./relationship.service";
import { RelationshipEntity } from "./relationship.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  FriendDto,
  FriendFilterDto,
  RelationShipDto,
  RequestDto,
  UpdateRelationshipDto,
} from "./dtos";
import { arrDataToRespone } from "src/common/respone/util";

@ApiTags("relationship")
@Controller("relationship")
export class RelationshipController {
  constructor(private relationshipService: RelationshipService) {}

  @Post("new")
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: "Friend request sent",
    type: RelationshipEntity,
  })
  async create(@Body() data: RelationShipDto) {
    return this.relationshipService.create(data);
  }

  @Patch("update")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: "Update user", type: RelationshipEntity })
  async update(@Body() data: UpdateRelationshipDto) {
    return this.relationshipService.update(data);
  }

  @Delete("unfriend")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: "Unfriend user" })
  async delete(@Body() data: RelationShipDto) {
    return this.relationshipService.delete(data);
  }

  @Post("friends")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: "Get friends", type: FriendDto })
  async getFriends(
    @Query("userID") userID: string,
    @Body() data: FriendFilterDto
  ) {
    const friends = await this.relationshipService.getFriends(userID);
    return arrDataToRespone(FriendDto)(friends, friends.length);
  }

  @Get("pending/list")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Get list pending friend request",
    type: RequestDto,
  })
  async getPendingRequests(@Query("userID") userID: string) {
    return this.relationshipService.getPendingRequests(userID);
  }

  @Get("sent/list")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Get list sent friend request",
    type: RequestDto,
  })
  async getSentRequests(@Query("userID") userID: string) {
    return this.relationshipService.getSentRequests(userID);
  }
}
