import './globals.css';
import { Inter } from 'next/font/google';
import ClientWrapper from '@/Components/Common/client-wrappe';

export const metadata = {
	title: 'Your App',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
			<body >
				<ClientWrapper>{children}</ClientWrapper>
			</body>
		</html>
	);
}
