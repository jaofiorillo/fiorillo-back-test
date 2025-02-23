import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByEmail(email);
        console.log(user);

        if (user?.password !== pass) {
            throw new UnauthorizedException('Credenciais incorretas');
        }
        const payload = { sub: user.id, username: user.name };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
