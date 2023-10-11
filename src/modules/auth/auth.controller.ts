import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDto, GetMeDto, LoginDto } from "./dtos";
import { AuthService } from "./auth.service";
import { UserEntity } from "../users/user.entity";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "Register user", type: UserEntity })
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserEntity | null> {
    const newUser = await this.authService.register(createUserDto);
    return newUser;
  }

  @Post("login")
  @ApiOkResponse({ description: "Login user", type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get("me")
  @ApiOkResponse({ description: "Get me", type: GetMeDto })
  async getMe(@Req() req): Promise<GetMeDto> {
    return req.user;
  }
}
