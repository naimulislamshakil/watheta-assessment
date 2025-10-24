'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { Button } from '@/Components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
	useReactTable,
	getCoreRowModel,
	getExpandedRowModel,
	flexRender,
} from '@tanstack/react-table';
import { PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

const Page = () => {
	const route = useRouter();

	const columns = useMemo(
		() => [
			{
				accessorKey: 'id',
				header: 'Order ID',
			},
			{
				accessorKey: 'customer',
				header: 'Customer',
			},
			{
				accessorKey: 'total',
				header: 'Total',
			},
			{
				id: 'expander',
				header: () => null,
				cell: ({ row }) => (
					<button
						onClick={() => row.toggleExpanded()}
						className="text-blue-500"
					>
						{row.getIsExpanded() ? 'Collapse' : 'Expand'}
					</button>
				),
			},
		],
		[]
	);

	const { data } = useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const res = await fetch('http://localhost:5000/api/v1/dashboard/orders');

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to get order');
			}

			return res.json();
		},
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
	});
	return (
		<div className="p-3">
			<Breadcrumb firstValue="Order Section" mainValue="Dashboard / Orders" />

			<div className="flex justify-end items-center">
				<Button onClick={(e) => route.push('/dashboard/orders/create')}>
					<PlusCircleIcon className="w-5" />
					Add New Order
				</Button>
			</div>

			{/* Table */}
			<table className="min-w-full border">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="border p-2">
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
			</table>
		</div>
	);
};

export default Page;
