import {Arg, OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {BasicStrategy} from "passport-http";
import {Strategy} from "passport";
import { $log, Req } from "@tsed/common";
import { UserService } from "../services/UserService";


@Protocol({
    name: "basic",
    useStrategy: BasicStrategy,
    settings: {}
})
export class BasicAuthProtocol implements OnVerify, OnInstall {

    constructor(
        protected userService: UserService
    ){}

    $onVerify(@Req() request: Req, @Arg(0) login: string, @Arg(1) password: string) {
        $log.info(`received request from ${login}, and ${password}, `)
        const user = this.userService.getUserByEmailAndPass(login, password);

        if (!user) {
            return false;
        }

        return user;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $onInstall(strategy: Strategy): void | Promise<void> {
    }
    
}
