import { User } from "@prisma/client";
import { Inject, Injectable } from "@tsed/di";
import { $log } from "@tsed/logger";
import { prismaAddUser, prismaGetUserById as prismaGetUserByEmail, prismaGetUserByEmailAndPass, prismaUpdateUser } from "../db/user";
import { UserModel } from "../models/UserModel";
import { PrismaService } from "./PrismaService";
import { NotFound } from "@tsed/exceptions";


@Injectable()
export class UserService {

    @Inject()
    protected prisma: PrismaService

    async registerNewUser(
        registerUserModel: UserModel
    ): Promise<User> {
        try {
            return await prismaAddUser(this.prisma, registerUserModel)
        } catch (error) {
            $log.error(error);
            throw error
          }
    }

    async updateUser(
        email: string,
        updateUserModel: UserModel
    ): Promise<User> {
        try {
            const userExist = await this.getUserByEmail(email);
            if(!userExist){
                throw new NotFound(`User with email ${email} not found`);
            }
            return await prismaUpdateUser(this.prisma, email, updateUserModel)
        } catch (error) {
            $log.error(error);
            throw error
          }
    }



    async getUserByEmail(userID: string): Promise<User|null> {
        return await prismaGetUserByEmail(this.prisma, userID);
    }

    async getUserByEmailAndPass(email: string, password: string): Promise<User|null> {
        return await prismaGetUserByEmailAndPass(this.prisma, email, password);
    }
}