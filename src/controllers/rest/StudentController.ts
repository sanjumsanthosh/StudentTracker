import {  BodyParams, Logger } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Get, Groups, Post, Summary } from "@tsed/schema";
import { StudentService } from "../../services/StudentService";
import { StudentDataModel } from "../../models/StudentModel";



@Controller('/student')
export class StudentController{
    constructor(
        private logger: Logger,
        protected studentService: StudentService
    ){}

    @Get('/')
    @Summary("Get all students")
    async getAllStudentDetails() {
        this.logger.info("Get all students details");
        const students = await this.studentService.getAllStudents();
        return students;
    }

    @Post('/')
    @Summary("Register new student")
    async registerNewStudent(
        @BodyParams() @Groups("creation") registerStudentModel: StudentDataModel
    ) {
        this.logger.info("Register new student");
        const student = await this.studentService.registerNewStudent(registerStudentModel);
        return student;
    }
}