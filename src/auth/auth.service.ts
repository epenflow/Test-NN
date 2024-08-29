import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptedService } from 'src/account/service/encrypted.service';
import { JWTPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
		@Inject(JwtService)
		private readonly jwtService: JwtService,
		@Inject(EncryptedService)
		private readonly encryptedService: EncryptedService,
	) {}
	async register(createAuthDto: CreateAuthDto): Promise<Account> {
		const account: Account = this.accountRepository.create(createAuthDto);
		const saveAccount = await this.accountRepository.save(account);
		delete saveAccount.password;
		return saveAccount;
	}
	async login(loginAuthDto: LoginAuthDto): Promise<{
		account: Account;
		token: string;
	}> {
		const { email, password } = loginAuthDto;
		const account = await this.accountRepository.findOne({
			where: {
				email,
			},
		});
		if (!account) {
			throw new BadRequestException(`Account doesn't exist.`);
		}
		if (
			!(await this.encryptedService.compared(password, account.password))
		) {
			throw new BadRequestException('Invalid credentials');
		}
		const payload: JWTPayload = {
			id: account.id,
			username: account.username,
			email: account.email,
		};
		const token: string = await this.jwtService.signAsync(payload);
		return {
			account,
			token,
		};
	}
}
