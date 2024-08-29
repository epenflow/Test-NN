import {
	IsEmail,
	IsNotEmpty,
	Matches,
	MinLength,
	Validate,
} from 'class-validator';
import { Encrypted } from 'src/account/decorator/encrypted.decorator';
import { Lowercase } from 'src/account/decorator/lowercase.decorator';
import { Sanitize } from 'src/account/decorator/sanitize.decorator';
import { UniqueEmail } from 'src/account/validator/unique-email.validator';
import { UniqueUsername } from 'src/account/validator/unique-username.validator';

export class CreateAccountDto {
	@IsNotEmpty()
	@Sanitize()
	@Validate(UniqueUsername)
	@Matches(/^[a-z][a-z0-9._]*$/, {
		message:
			'Username should start with a lowercase letter and contain only lowercase letters, digits, underscore, and periods',
	})
	username: string;

	@IsNotEmpty()
	@Sanitize()
	@Lowercase()
	@Validate(UniqueEmail)
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Sanitize()
	@MinLength(5, {
		message: 'Password at least must have five characters',
	})
	@Matches(/^(?=.*[a-z])(?=.*[a-z])(?=.*\d).+$/, {
		message:
			'Password must contain at least on uppercase letter, one lowercase letter, and one number',
	})
	@Encrypted()
	password: string;
}
