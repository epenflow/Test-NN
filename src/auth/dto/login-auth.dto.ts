import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { Sanitize } from 'src/account/decorator/sanitize.decorator';
import { AvailableEmail } from 'src/account/validator/available-email.validator';

export class LoginAuthDto {
	@IsNotEmpty()
	@Sanitize()
	@IsEmail()
	@Validate(AvailableEmail)
	email: string;

	@IsNotEmpty()
	@Sanitize()
	password: string;
}
