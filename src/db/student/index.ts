import { Student } from "@prisma/client";
import { StudentDataModel } from "../../models/StudentModel";
import { PrismaService } from "../../services/PrismaService";

export function prismaAddStudent(prisma: PrismaService, studentModel: StudentDataModel): Promise<Student> {
    
    return prisma.student.create({
        data: {
            name: studentModel.name
        }
    })
}


export function prismaGetAllStudents(prisma: PrismaService): Promise<Student[]> {
    return prisma.student.findMany();
}

export function prismaGetStudentById(prisma: PrismaService, studentId: string) {
    return prisma.student.findUnique({
        where:{
            id: studentId
        },
    })
}

export function prismaDeleteStudent(prisma: PrismaService, studentId: string) {
    return prisma.student.delete({
        where:{
            id: studentId
        },
        
    })
}