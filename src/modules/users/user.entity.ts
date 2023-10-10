import { User } from "@prisma/client";

export class UserEntity implements User {
    id: string;
    email: string;
    password: string;
    username: string;
    name: string;
    avatar: string;
    dob: Date;
    gender: string;
}