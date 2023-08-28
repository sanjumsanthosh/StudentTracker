import { PrismaService } from "./PrismaService";
import { StudentDataModel } from "../models/StudentModel";
import { prismaAddStudent, prismaDeleteStudent, prismaGetAllStudents, prismaGetStudentById } from "../db/student";
import { Student } from "@prisma/client";
import { Inject, Injectable } from "@tsed/di";
import { $log } from "@tsed/logger";
import { NotFound } from "@tsed/exceptions";

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
            $log.error(error);
            throw error
          }
    }


    async getAllStudents(): Promise<Student[]> {
      return await prismaGetAllStudents(this.prisma);
    }

    async getStudentById(studentID: string) {
      return await prismaGetStudentById(this.prisma, studentID);
    }

    async deleteStudent(studentID: string) {
      $log.info(`Deleting student with id ${studentID}`);
      const studentExist = await this.getStudentById(studentID);
      if(!studentExist){
        throw new NotFound(`Student with id ${studentID} not found`);
      }
      return await prismaDeleteStudent(this.prisma, studentID);
    }
}