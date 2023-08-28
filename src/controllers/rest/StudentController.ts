import {  BodyParams, Logger, PathParams } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Delete, Get, Groups, Post, Returns, Summary } from "@tsed/schema";
import { StudentService } from "../../services/StudentService";
import { StudentDataModel } from "../../models/StudentModel";
import { NotFound } from "@tsed/exceptions";



@Controller('/student')
export class StudentController{
    constructor(
        private logger: Logger,
        protected studentService: StudentService
    ){}

    @Get('/')
    @Summary("Get all students")
    @Returns(200)
    async getAllStudentDetails() {
        this.logger.info("Get all students details");
        const students = await this.studentService.getAllStudents();
        return students;
    }

    @Get("/:studentID")
    @Summary("Get student by id")
    @Returns(200)
    @Returns(404).Description("Not found")
    async getStudentById(
        @PathParams("studentID") studentID: string
    ) {
        this.logger.info("Get student by id");
        const student = await this.studentService.getStudentById(studentID);
        if (!student) {
            throw new NotFound(`Student with id ${studentID} not found`);
        }
        return student;
    }

    @Post('/')
    @Summary("Register new student")
    @Returns(201)
    async registerNewStudent(
        @BodyParams() @Groups("creation") registerStudentModel: StudentDataModel
    ) {
        this.logger.info("Register new student");
        const student = await this.studentService.registerNewStudent(registerStudentModel);
        return student;
    }

    @Delete('/:studentID')
    @Summary("Delete new student")
    @Returns(201)
    @Returns(404).Description("Student not found")
    async deleteStudent(
        @PathParams("studentID") studentID: string
    ) {
        this.logger.info("Delete new student");
        const student = await this.studentService.deleteStudent(studentID);
        return student;
    }
}