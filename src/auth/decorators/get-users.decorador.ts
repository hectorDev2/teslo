import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common"

export const getUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if (!user) {
            throw new InternalServerErrorException('user not found(request)');
        }
        return (data) ? user[data] : user;
    }
)