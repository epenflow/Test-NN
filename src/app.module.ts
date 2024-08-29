import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.NEST_DATABASE_HOST,
			port: parseInt(process.env.NEST_DATABASE_PORT),
			username: process.env.NEST_DATABASE_USERNAME,
			password: process.env.NEST_DATABASE_PASSWORD,
			database: process.env.NEST_DATABASE_NAME,
			synchronize: true,
			autoLoadEntities: true,
			logging: true,
		}),
		AccountModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
