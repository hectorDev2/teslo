
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common"

export const getRawHeaders = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.rawHeaders;
    }
)