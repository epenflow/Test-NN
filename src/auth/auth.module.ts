import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { AvailableEmail } from 'src/account/validator/available-email.validator';
import { JwtModule } from '@nestjs/jwt';

import { EncryptedService } from 'src/account/service/encrypted.service';
import { ConfigModule } from '@nestjs/config';
@Module({
	imports: [
		TypeOrmModule.forFeature([Account]),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		JwtModule.register({
			secret: process.env.NEST_JWT_SECRET,
			signOptions: { expiresIn: '1d' },
			global: true,
		}),
	],
	controllers: [AuthController],
	providers: [
		/**
		 * Services
		 */
		EncryptedService,
		AuthService,
		/**
		 * Validations
		 */
		AvailableEmail,
	],
})
export class AuthModule {}
