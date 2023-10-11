import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RelationShipDto, UpdateRelationshipDto } from "./dtos";

@Injectable()
export class RelationshipService {
  constructor(private prisma: PrismaService) {}

  async create(data: RelationShipDto) {
    const userRelation = await this.prisma.relationship.findMany({
      where: { userID: data.userID, friendID: data.friendID },
    });

    console.log(userRelation);

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
        userID: data.userID,
        friendID: data.friendID,
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

  async getFriends(userID: string) {
    return this.prisma.relationship.findMany({
      where: {
        userID,
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
