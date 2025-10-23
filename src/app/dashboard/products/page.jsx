import Breadcrumb from '@/Components/Common/Breadcrumb';
import { Button } from '@/Components/ui/button';
import {  PlusCircleIcon } from 'lucide-react';
import React from 'react';

const page = () => {
	return (
		<div className='p-3'>
			<Breadcrumb firstValue="Product Section" mainValue="Dashboard / Products" />

			<div className='flex justify-end items-center'>
				<Button>
					<PlusCircleIcon className='w-5' />
					Add New Product
				</Button>
			</div>



			{/* Table */}
		</div>
	);
};

export default page;
