'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { Button } from '@/Components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
	const route = useRouter();

	return (
		<div className="p-3">
			<Breadcrumb
				firstValue="Product Section"
				mainValue="Dashboard / Products"
			/>

			<div className="flex justify-end items-center">
				<Button onClick={(e) => route.push('/dashboard/products/create')}>
					<PlusCircleIcon className="w-5" />
					Add New Product
				</Button>
			</div>

			{/* Table */}
		</div>
	);
};

export default Page;
