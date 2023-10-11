import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UpdateUserDto, CreateUserDto } from "./dtos";
import { brcyptHelper } from "src/utils/bcrypt";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (
      !user ||
      !(await brcyptHelper.comparePassword(password, user.password))
    ) {
      throw new ForbiddenException("email or password not valid");
    }

    return user;
  }

  async getUser(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const users = await this.prisma.user.findMany({
      where: { email: data.email },
    });
    if (users.length) {
      throw new ForbiddenException("email already exists");
    }
    data.password = await brcyptHelper.hash(data.password);
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    id: string;
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    const { id, data } = params;
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async deleteUser(id: string): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
