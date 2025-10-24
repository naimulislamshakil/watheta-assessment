'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/Components/ui/select';
import { Skeleton } from '@/Components/ui/skeleton';
import { Textarea } from '@/Components/ui/textarea';
import orderSchema from '@/lib/Ordervalidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(orderSchema),
	});

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await fetch(
				'http://localhost:5000/api/v1/dashboard/products/create',
				{
					method: 'GET',
				}
			);

			if (!res.ok) throw new Error('Failed to get product');
			return res.json();
		},
	});

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
				{[1, 2, 3].map((n) => (
					<Skeleton key={n} className="h-32 rounded-lg" />
				))}
			</div>
		);
	}

	const onSubmit = (data) => {
		console.log('Order data:', data);
		// send to backend here
	};

	return (
		<div className="p-3">
			<Breadcrumb
				firstValue="Product Section"
				mainValue="Dashboard / Orders / Add Orders"
			/>

			<div className="mt-5 max-w-2xl mx-auto">
				<Card className="rounded">
					<CardHeader>
						<CardTitle>Create Order</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							{/* Product */}
							<div>
								<Label>Product</Label>
								<Select
									onValueChange={(value) => setValue('products', [value])}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select product" />
									</SelectTrigger>
									<SelectContent className="w-full">
										{data?.products?.map((p, i) => (
											<SelectItem key={i} value={p.productName}>
												{p.productName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errors.products && (
									<p className="text-red-500 text-sm">
										{errors.products.message}
									</p>
								)}
							</div>

							{/* Quantity */}
							<div>
								<Label>Quantity</Label>
								<Input
									type="number"
									{...register('quantity')}
									placeholder="Enter quantity"
								/>
								{errors.quantity && (
									<p className="text-red-500 text-sm">
										{errors.quantity.message}
									</p>
								)}
							</div>

							{/* Client Name */}
							<div>
								<Label>Client Name</Label>
								<Input
									type="text"
									{...register('clientName')}
									placeholder="Client name"
								/>
								{errors.clientName && (
									<p className="text-red-500 text-sm">
										{errors.clientName.message}
									</p>
								)}
							</div>

							{/* Delivery Address */}
							<div>
								<Label>Delivery Address</Label>
								<Textarea
									{...register('deliveryAddress')}
									placeholder="Enter address"
								/>
								{errors.deliveryAddress && (
									<p className="text-red-500 text-sm">
										{errors.deliveryAddress.message}
									</p>
								)}
							</div>

							{/* Payment Status */}
							<div>
								<Label>Payment Status</Label>
								<Select
									onValueChange={(value) => setValue('paymentStatus', value)}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select payment status" />
									</SelectTrigger>
									<SelectContent className="w-full">
										<SelectItem value="Paid">Paid</SelectItem>
										<SelectItem value="Pending">Pending</SelectItem>
										<SelectItem value="Refunded">Refunded</SelectItem>
									</SelectContent>
								</Select>
								{errors.paymentStatus && (
									<p className="text-red-500 text-sm">
										{errors.paymentStatus.message}
									</p>
								)}
							</div>

							{/* Delivery Status */}
							<div>
								<Label>Delivery Status</Label>
								<Select
									onValueChange={(value) => setValue('deliveryStatus', value)}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select delivery status" />
									</SelectTrigger>
									<SelectContent className="w-full">
										<SelectItem value="Pending">Pending</SelectItem>
										<SelectItem value="Shipped">Shipped</SelectItem>
										<SelectItem value="Delivered">Delivered</SelectItem>
										<SelectItem value="Canceled">Canceled</SelectItem>
									</SelectContent>
								</Select>
								{errors.deliveryStatus && (
									<p className="text-red-500 text-sm">
										{errors.deliveryStatus.message}
									</p>
								)}
							</div>

							{/* Expected Delivery Date */}
							<div>
								<Label>Expected Delivery Date</Label>
								<Input type="date" {...register('expectedDeliveryDate')} />
								{errors.expectedDeliveryDate && (
									<p className="text-red-500 text-sm">
										{errors.expectedDeliveryDate.message}
									</p>
								)}
							</div>

							<Button type="submit" className="w-full">
								Create Order
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Page;
