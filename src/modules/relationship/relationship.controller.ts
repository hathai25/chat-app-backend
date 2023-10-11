import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { RelationshipService } from "./relationship.service";
import { RelationshipEntity } from "./relationship.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RelationShipDto } from "./dtos";

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
  async update(@Body() data: RelationshipEntity) {
    return this.relationshipService.update(data);
  }

  @Delete("unfriend")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: "Unfriend user" })
  async delete(@Body() data: RelationShipDto) {
    return this.relationshipService.delete(data);
  }

  @Get("friends")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: "Get friends", type: RelationshipEntity })
  async getFriends(@Param() userID: string) {
    return this.relationshipService.getFriends(userID);
  }

  @Get("requests")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "Get friends pending",
    type: RelationshipEntity,
  })
  async getFriendsPending(@Param() userID: string) {
    return this.relationshipService.getFriendRequests(userID);
  }
}
