import { Transform, TransformFnParams } from 'class-transformer';
import { EncryptedService } from 'src/account/service/encrypted.service';

export function Encrypted(): PropertyDecorator {
	return Transform(({ value }: TransformFnParams): string => {
		const _value: string = String(value);
		const encryptedService = new EncryptedService();
		const encrypted: string = encryptedService.SyncEncrypted(_value);
		return encrypted;
	});
}
