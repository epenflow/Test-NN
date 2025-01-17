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
export class AvailableEmail implements ValidatorConstraintInterface {
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
		if (!account) {
			return false;
		}
		return true;
	}
	defaultMessage?(): string {
		return `Email ($value) doesn't exist`;
	}
}
