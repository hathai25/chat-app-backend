import { arrDataToRespone } from "src/common/respone/util";
import { Relationship } from "@prisma/client";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {
  FriendDto,
  RelationShipDto,
  RequestDto,
  UpdateRelationshipDto,
} from "./dtos";
import { ISuccessListRespone } from "src/common/respone/interface";

@Injectable()
export class RelationshipService {
  constructor(private prisma: PrismaService) {}

  async create(data: RelationShipDto) {
    const userRelation = await this.prisma.relationship.findMany({
      where: { userID: data.userID, friendID: data.friendID },
    });

    if (userRelation.length) {
      throw new ForbiddenException("Already relation exists");
    }

    return this.prisma.relationship.createMany({
      data: [
        {
          senderID: data.userID,
          userID: data.userID,
          friendID: data.friendID,
          status: "pending",
        },
        {
          senderID: data.userID,
          userID: data.friendID,
          friendID: data.userID,
          status: "pending",
        },
      ],
    });
  }

  async update(data: UpdateRelationshipDto) {
    return this.prisma.relationship.updateMany({
      data: { status: data.status },
      where: {
        OR: [
          {
            userID: data.userID,
            friendID: data.friendID,
          },
          {
            userID: data.friendID,
            friendID: data.userID,
          },
        ],
      },
    });
  }

  async delete(data: RelationShipDto) {
    return this.prisma.relationship.deleteMany({
      where: {
        userID: data.userID,
        friendID: data.friendID,
      },
    });
  }

  async getFriends(userID: string): Promise<FriendDto[]> {
    const data = await this.prisma.relationship.findMany({
      where: {
        userID: userID,
        status: "accepted",
      },
      select: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return data.map((item) => item.friend);
  }

  async getPendingRequests(
    userID: string
  ): Promise<ISuccessListRespone<RequestDto>> {
    const data = await this.prisma.relationship.findMany({
      where: {
        friendID: userID,
        status: "pending",
        senderID: {
          not: userID,
        },
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        status: true,
        id: true,
      },
    });

    const result = data.map((item) => {
      return {
        id: item.id,
        status: item.status,
        ...item.user,
        userID: item.user.id,
      };
    });

    return arrDataToRespone(RequestDto)(result, result.length);
  }

  async getSentRequests(
    userID: string
  ): Promise<ISuccessListRespone<RequestDto>> {
    const data = await this.prisma.relationship.findMany({
      where: {
        senderID: userID,
        status: "pending",
      },
      select: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        status: true,
        id: true,
      },
    });

    const result = data.map((item) => {
      return {
        id: item.id,
        status: item.status,
        ...item.friend,
        userID: item.friend.id,
      };
    });

    return arrDataToRespone(RequestDto)(result, result.length);
  }
}
