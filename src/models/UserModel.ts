import { UserType } from "@prisma/client"
import { Example, Groups } from "@tsed/schema"

export class UserModel {

    @Example("John Doe")
    @Groups("creation")
    name: string

    @Example("sample.exmaple@test.com")
    @Groups("creation")
    email: string

    @Example("password")
    @Groups("creation")
    password: string

    @Example(UserType.ADMIN)
    @Groups("creation","update")
    type: UserType
}

