import { PrismaService } from "./PrismaService";
import { StudentDataModel } from "../models/StudentModel";
import { prismaAddStudent, prismaDeleteStudent, prismaGetAllStudents } from "../db/student";
import { Student } from "@prisma/client";
import { ExceptionTypes, PrismaClientException } from "../errors/PrismaClientException";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Inject, Injectable } from "@tsed/di";

@Injectable()
export class StudentService {

    @Inject()
    protected prisma: PrismaService

    async registerNewStudent(
        registerStudentModel: StudentDataModel
    ): Promise<{student: Student}> {
        try {
            const student = await prismaAddStudent(this.prisma, registerStudentModel)
            return {student};
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              let msg = error.message
              switch (error.code) {
                case 'P2025':
                  msg = 'Unregistered/Invalid Site id found'
                  throw new PrismaClientException(msg, ExceptionTypes.ClientException)
                default:
                  break
              }
            }
            throw error
          }
    }


    async getAllStudents(): Promise<Student[]> {
      return await prismaGetAllStudents(this.prisma);
    }

    async deleteStudent(registerStudentModel: StudentDataModel) {
      return await prismaDeleteStudent(this.prisma, registerStudentModel.studentID!);
    }
}