import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from "class-validator";
import { GenderType } from "../../users/enums";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatar: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  dob: Date;

  @IsEnum(GenderType)
  @IsNotEmpty()
  @ApiProperty()
  gender: GenderType;
}
