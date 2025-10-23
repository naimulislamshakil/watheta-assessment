import AppSidebar from '@/Components/Common/AppSidebar';
import Navbar from '@/Components/Common/Navbar';
import { SidebarProvider } from '@/Components/ui/sidebar';
import React from 'react';

const layout = ({ children }) => {
	return (
		<SidebarProvider>
			<AppSidebar />

			<main className='w-full'>
				<Navbar />
				
				{children}
			</main>
		</SidebarProvider>
	);
};

export default layout;
