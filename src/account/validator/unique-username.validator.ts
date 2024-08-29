import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUsername implements ValidatorConstraintInterface {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}
	async validate(username: string): Promise<boolean> {
		const account: Account = await this.accountRepository.findOne({
			where: {
				username,
			},
		});
		return !account;
	}
	defaultMessage() {
		return `Username ($value) already. Please choose another username`;
	}
}
