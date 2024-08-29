import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { UniqueUsername } from 'src/account/validator/unique-username.validator';
import { UniqueEmail } from 'src/account/validator/unique-email.validator';

@Module({
	imports: [TypeOrmModule.forFeature([Account])],
	controllers: [AccountController],
	providers: [
		AccountService,
		/**
		 * Validation
		 */
		UniqueUsername,
		UniqueEmail,
	],
})
export class AccountModule {}
