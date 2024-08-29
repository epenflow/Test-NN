import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { JWTPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.NEST_JWT_SECRET,
		});
	}
	async validate(payload: JWTPayload): Promise<JWTPayload> {
		const account = await this.accountRepository.findOne({
			where: {
				id: payload.id,
				username: payload.username,
				email: payload.email,
			},
		});
		if (!account) {
			throw new UnauthorizedException('Token is invalid or expired');
		}
		return payload;
	}
}
