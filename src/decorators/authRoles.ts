import { Middleware, Req, Context, UseBefore } from "@tsed/common";
import { StoreSet, useDecorators } from "@tsed/core";
import { Forbidden } from "@tsed/exceptions";
import { Returns } from "@tsed/schema";
import { UserModel } from "../models/UserModel";

@Middleware()
export class AuthRolesMiddleware{
    public use(@Req("user") user: UserModel, @Context() context: Context) {
        if (user){
            const roles =  context.endpoint.get(AuthRolesMiddleware);

            if (!roles.includes(user.type)){
                throw new Forbidden("Unauthorized");
            }
        }
    }
}

export function AuthRoles(...roles: string[]) {
    return useDecorators(
      UseBefore(AuthRolesMiddleware),
      StoreSet(AuthRolesMiddleware, roles),
      Returns(403, Forbidden).Description("Forbidden")
    );
  }
  