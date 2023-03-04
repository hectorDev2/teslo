import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }
    async validate(payload: JwtPayload) {
        const { id } = payload;
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        })
        if (!user) {
            throw new UnauthorizedException('token is not valid');
        }
        if (!user.isActive) {
            throw new UnauthorizedException('user is not active,talk to admin');
        }
        return user;
    }
}