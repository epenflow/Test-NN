import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { AvailableEmail } from 'src/account/validator/available-email.validator';

@Module({
	imports: [TypeOrmModule.forFeature([Account])],
	controllers: [AuthController],
	providers: [
		AuthService,
		/**
		 * Validation
		 */
		AvailableEmail,
	],
})
export class AuthModule {}
