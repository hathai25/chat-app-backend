import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FriendDto, RelationShipDto, UpdateRelationshipDto } from "./dtos";
import { RelationshipEntity } from "./relationship.entity";

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
        { userID: data.userID, friendID: data.friendID, status: "pending" },
        { userID: data.friendID, friendID: data.userID, status: "pending" },
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

  async getFriendRequests(userID: string) {
    return this.prisma.relationship.findMany({
      where: {
        friendID: userID,
        status: "pending",
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
      },
    });
  }
}
