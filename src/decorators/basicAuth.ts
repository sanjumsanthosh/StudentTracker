import { useDecorators } from "@tsed/core";
import { Unauthorized } from "@tsed/exceptions";
import { $log } from "@tsed/logger";
import {Authenticate, AuthorizeOptions} from "@tsed/passport";
import { Security, Returns, In } from "@tsed/schema";


export function BasicAuth(options: AuthorizeOptions ={}){
    $log.info(`Received request with ${options}`)
    return useDecorators(
        Authenticate("basic",options),
        Security("basic"),
        Returns(401, Unauthorized).Description("Unauthorized"),
        In("header").Name("Authorization").Description("Basic authorization").Type(String).Required(false)
    )
}