import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDto, GetMeDto, LoginDto } from "./dtos";
import { AuthService } from "./auth.service";
import { UserEntity } from "../users/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserEntity | null> {
    const newUser = await this.authService.register(createUserDto);
    return newUser;
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get("me")
  async getMe(@Req() req): Promise<GetMeDto> {
    return req.user;
  }
}
