import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { AvailableEmail } from 'src/account/validator/available-email.validator';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { EncryptedService } from 'src/account/service/encrypted.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Account]),
		JwtModule.register({
			secret: ``,
			signOptions: { expiresIn: '1d' },
		}),
	],
	controllers: [AuthController],
	providers: [
		/**
		 * Services
		 */
		EncryptedService,
		JwtService,
		AuthService,
		/**
		 * Validations
		 */
		AvailableEmail,
	],
})
export class AuthModule {}
