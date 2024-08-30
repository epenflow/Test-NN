import { LoginSchema } from '@/schemas/login.schema';
import axios from 'axios';
import * as z from 'zod';
export async function loginActions(values: z.infer<typeof LoginSchema>) {
	const validatedFields = LoginSchema.safeParse(values);
	if (!validatedFields.success) {
		throw new Error('Invalid fields');
	}
	const { email, password } = validatedFields.data;
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/login`,
			{
				email,
				password,
			},
			{
				withCredentials: true,
			},
		);
		console.log(response);
		return response.data;
	} catch (error) {
		return error;
	}
}
