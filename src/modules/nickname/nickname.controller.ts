import { ApiTags } from "@nestjs/swagger";
import { NicknameService } from "./nickname.service";
import { Controller } from "@nestjs/common";

@ApiTags("Nickname")
@Controller("nickname")
export class NicknameController {
  constructor(private nicknameService: NicknameService) {}
}
