import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	ValidatorConstraintInterface,
	ValidatorConstraint,
} from 'class-validator';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}
	async validate(email: string): Promise<boolean> {
		const account: Account = await this.accountRepository.findOne({
			where: {
				email,
			},
		});
		return !account;
	}
	defaultMessage(): string {
		return `Email ($value) already exist. Please choose another email`;
	}
}
