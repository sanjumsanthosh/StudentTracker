import { ResponseErrorObject } from "@tsed/common";
import { BadRequest } from "@tsed/exceptions";

export enum ExceptionTypes {
    ClientException = 400,
    ServiceException = 503
}

export class PrismaClientException extends BadRequest implements ResponseErrorObject {
    private exceptionType: ExceptionTypes;
    constructor(message: string, exceptionType?: ExceptionTypes) {
        super(message);
        this.exceptionType = exceptionType || ExceptionTypes.ServiceException;
    }

    getStatusCode(): number {
        switch (this.exceptionType) {
            case ExceptionTypes.ClientException:
                return 400

            case ExceptionTypes.ServiceException:
            default:
                return 503
        }
    }
}


