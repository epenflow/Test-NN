import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	/**
	 * CORS configuration
	 */
	const CORSOptions: CorsOptions = {
		origin: process.env.NEST_FRONTED_HOST,
		credentials: true,
	};
	app.enableCors(CORSOptions);
	/**
	 * Custom validation using validate decorators
	 */
	useContainer(app.select(AppModule), {
		fallbackOnErrors: true,
	});
	app.use(cookieParser());
	app.useGlobalPipes(
		/**
		 * Validation configurations
		 */
		new ValidationPipe({
			/**
			 * Validator will print extra warning messages to the console
			 * when something is not right
			 */
			enableDebugMessages: true,

			whitelist: true,
			forbidNonWhitelisted: true,

			/** Transform validation value */
			transform: true,
		}),
	);
	const port: number = parseInt(process.env.NEST_PORT) || 5000;

	await app.listen(port);
}
bootstrap();
