import { IsDate, IsEnum, IsOptional, IsString, IsUrl } from "class-validator";
import { GenderType } from "../enums";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatar: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dob: Date;

  @IsOptional()
  @IsEnum(GenderType)
  @ApiProperty()
  gender: GenderType;
}
