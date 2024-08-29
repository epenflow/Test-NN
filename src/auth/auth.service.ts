import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}
	async register(createAuthDto: CreateAuthDto): Promise<Account> {
		const account: Account = this.accountRepository.create(createAuthDto);
		const saveAccount = await this.accountRepository.save(account);
		delete saveAccount.password;
		return saveAccount;
	}
	async login(loginAuthDto: LoginAuthDto): Promise<Account> {
		const { email } = loginAuthDto;
		const account = await this.accountRepository.findOne({
			where: {
				email,
			},
		});
		return account;
	}
}
