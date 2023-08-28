import { Controller } from "@tsed/di";
import { Logger } from "@tsed/logger";
import { UserService } from "../../services/UserService";
import { Groups, Patch, Post } from "@tsed/schema";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { UserModel } from "../../models/UserModel";
import { UserType } from "@prisma/client";
import { AuthRoles } from "../../decorators/authRoles";
import { BasicAuth } from "../../decorators/basicAuth";


@Controller('/user')
@BasicAuth()
export class UserController{

    constructor(
        private logger: Logger,
        protected userService: UserService
    ){}

    @Post('/')
    @AuthRoles(UserType.ADMIN)
    async registerNewUser(
        @BodyParams() @Groups("creation") registerUserModel: UserModel
    ) {
        this.logger.info("Register new user");
        const user = await this.userService.registerNewUser(registerUserModel);
        return user;
    }

    @Patch('/:email')
    @AuthRoles(UserType.ADMIN)
    async updateUser(
        @PathParams("email") email: string,
        @BodyParams() @Groups("update") updateUserModel: UserModel
    ) {
        this.logger.info("Update new user");
        const user = await this.userService.updateUser(email, updateUserModel);
        return user;
    }
    
}