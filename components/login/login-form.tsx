'use client';
import { loginActions } from '@/actions/login.actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
export const LoginForm = () => {
	const [isTransition, setTransition] = React.useTransition();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	function handleSubmit(values: z.infer<typeof LoginSchema>) {
		console.log('trigger submit button');
		setTransition(() => {
			loginActions(values)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}
	return (
		<Card className="">
			<CardContent>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(handleSubmit)}>
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="johndoe@example.com"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="password"
												placeholder="******"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type="submit"
							disabled={isTransition}
							className="w-full">
							Login
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
