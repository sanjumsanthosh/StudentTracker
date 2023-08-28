import { UserModel } from "src/models/UserModel";
import { PrismaService } from "src/services/PrismaService";

export function prismaAddUser(prisma: PrismaService, userModel: UserModel) {
    console.log("prismaAddUser")
    console.log(userModel)
    return prisma.user.create({
        data: {
            name: userModel.name,
            email: userModel.email,
            password: userModel.password,
            type: userModel.type
        }
    })
}


export function prismaUpdateUser(prisma: PrismaService, email: string, userModel: UserModel) {
    return prisma.user.update({
        where: {
            email: email
        },
        data: {
            email: userModel.email,
            password: userModel.password,
            type: userModel.type
        }
    })
}

export function prismaGetUserById(prisma: PrismaService, email: string) {
    return prisma.user.findUnique({
        where:{
            email: email
        },
    })
}

export function prismaGetUserByEmailAndPass(prisma: PrismaService, email: string, password: string) {
    return prisma.user.findUnique({
        where:{
            email: email,
            password: password
        },
    })
}