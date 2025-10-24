'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { Button } from '@/Components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
	const route = useRouter();
	return (
		<div className="p-3">
			<Breadcrumb firstValue="Order Section" mainValue="Dashboard / Orders" />

			<div className="flex justify-end items-center">
				<Button onClick={(e) => route.push('/dashboard/orders/create')}>
					<PlusCircleIcon className="w-5" />
					Add New Order
				</Button>
			</div>
		</div>
	);
};

export default Page;
