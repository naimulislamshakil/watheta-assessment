'use client';
import { ThemeProvider } from '@/Components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function ClientWrapper({ children }) {
	const [client] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={client}>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}
