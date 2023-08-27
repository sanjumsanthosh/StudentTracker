import { CollectionOf, Example, Groups, Required } from "@tsed/schema";


export class StudentDataModel {

    @Example("110ec58a-a0f2-4ac4-8393-c866d813b8d1")
    @Groups("!creation","delete")
    studentID?: string

    @Example("Sample Name","!delete")
    @Required()
    @Groups("creation")
    name: string

    @Groups("!creation","!delete")
    createdAt?: Date;

    @Groups("!creation","!delete")
    updatedAt?: Date;
    
}

export class StudentGetAllResponseModel {

    @Required()
    @CollectionOf(StudentDataModel)
    students: StudentDataModel[]
}