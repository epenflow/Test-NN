import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}
	async create(createAccountDto: CreateAccountDto): Promise<Account> {
		const account = this.accountRepository.create(createAccountDto);
		return this.accountRepository.save(account);
	}

	async findAll(): Promise<Account[]> {
		return await this.accountRepository.find();
	}

	findOne(id: number) {
		return `This action returns a #${id} account`;
	}

	update(id: number, updateAccountDto: UpdateAccountDto) {
		return `This action updates a #${id} account`;
	}

	remove(id: number) {
		return `This action removes a #${id} account`;
	}
}
