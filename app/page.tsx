'use client';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

export default function Home() {
	async function init() {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_HOST}/account`,
			{
				withCredentials: true,
				xsrfCookieName: 'auth',
			},
		);
		console.log(response);
	}
	React.useEffect(() => {
		console.log(init());
	}, []);
	return (
		<main>
			<h1>main</h1>
		</main>
	);
}
