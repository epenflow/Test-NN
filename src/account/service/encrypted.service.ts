import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EncryptedService {
	private readonly saltRounds: number = 15;
	/**
	 *
	 * @param {string} value
	 * @returns {string}
	 * @description This method for asynchronous hashing
	 */
	async encrypt(value: string): Promise<string> {
		const salt: string = await bcrypt.genSalt(this.saltRounds);
		return await bcrypt.hash(value, salt);
	}
	/**
	 *
	 * @param {string} value
	 * @returns {string}
	 * @description This method for synchronous hashing
	 */
	SyncEncrypted(value: string): string {
		const salt: string = bcrypt.genSaltSync(this.saltRounds);
		return bcrypt.hashSync(value, salt);
	}
	/**
	 *
	 * @param {string} value
	 * @param {string} encrypted
	 * @returns {string}
	 * @description This method for asynchronous compare
	 */
	async compared(value: string, encrypted: string): Promise<boolean> {
		return await bcrypt.compare(value, encrypted);
	}
	/**
	 *
	 * @param {string} value
	 * @param {string} encrypted
	 * @returns {string}
	 * @description This method for synchronous compare
	 */
	SyncCompared(value: string, encrypted: string): boolean {
		return bcrypt.compareSync(value, encrypted);
	}
}
