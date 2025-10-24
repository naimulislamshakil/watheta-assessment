'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/Components/ui/select';
import { Switch } from '@/Components/ui/switch';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@radix-ui/react-dropdown-menu';
import { UploadCloud } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { productSchema } from '@/lib/productValidation';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const categories = ['Electronics', 'Furniture', 'Clothing'];

const Page = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(productSchema),
	});
	const [activeStatus, setActiveStatus] = useState(true);
	const [image, setImage] = useState(null);
	const queryClient = useQueryClient();
	const fileInputRef = useRef(null);

	const [mounted, setMounted] = useState(false);
	React.useEffect(() => setMounted(true), []);

	const handleFileChange = (e) => {
		const image = e.target.files[0];
		if (image) {
			const formData = new FormData();
			formData.append('image', image);

			fetch(
				'https://api.imgbb.com/1/upload?key=4268f2bb824fb4f955a82655bbc0b28c',
				{
					method: 'POST',
					body: formData,
				}
			)
				.then((res) => res.json())
				.then((data) => {
					setImage(data?.data?.display_url);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) {
			setImage(URL.createObjectURL(file));
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleChange = async (e) => {
		const file = e.target.files?.[0];

		if (file) {
			setImage(URL.createObjectURL(file));
		}
	};

	const createProductMutation = useMutation({
		mutationFn: async (newProduct) => {
			const res = await fetch(
				'http://localhost:5000/api/v1/dashboard/products/create',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newProduct),
				}
			);
			console.log(res);
			if (!res.ok) throw new Error('Failed to create product');

			const data = res.json();

			toast.success('Product Add Successful.');
			router.push('/dashboard/products');

			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});

	const onSubmit = (data) => {
		if (image) {
			const newProduct = { ...data, activeStatus, productImage: image };
			createProductMutation.mutate(newProduct);
			reset();
			setActiveStatus(true);
		}
	};

	console.log(
		createProductMutation.data,
		createProductMutation.isPending,
		createProductMutation.error
	);

	return (
		<div className="p-3">
			<Breadcrumb
				firstValue="Product Section"
				mainValue="Dashboard / Products / Add Product"
			/>

			<div className="mt-5 max-w-2xl mx-auto">
				<Card className="bg-card rounded w-full">
					<CardHeader>
						<CardTitle>Add Product</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
							<div className="flex flex-col gap-2">
								<label htmlFor="productName">Product Name</label>
								<Input
									id="productName"
									{...register('productName', { required: true })}
									placeholder="Enter product name"
								/>
								{errors?.productName && (
									<span className="text-red-500 text-sm">
										{errors?.productName?.message}
									</span>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="sku">SKU</label>
								<Input
									id="sku"
									className="uppercase"
									{...register('sku', { required: true })}
									placeholder="SKU"
								/>
								{errors?.sku && (
									<span className="text-red-500 text-sm">
										{errors?.sku?.message}
									</span>
								)}
							</div>

							<Controller
								name="category"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent className="w-full">
											<SelectGroup>
												{categories.map((cat) => (
													<SelectItem key={cat} value={cat}>
														{cat}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>

							{errors?.category && (
								<span className="text-red-500 text-sm">
									{errors?.category?.message}
								</span>
							)}

							<div className="flex flex-col gap-2">
								<label htmlFor="price">Price</label>
								<Input
									id="price"
									type="number"
									step="0.01"
									{...register('price', { required: true, min: 0 })}
									placeholder="Price"
								/>
								{errors?.price && (
									<span className="text-red-500 text-sm">
										{errors?.price?.message}
									</span>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="stockQuantity">Stock Quantity</label>
								<Input
									id="stockQuantity"
									type="number"
									{...register('stockQuantity', { required: true, min: 0 })}
									placeholder="Stock Quantity"
								/>
								{errors?.stockQuantity && (
									<span className="text-red-500 text-sm">
										{errors?.stockQuantity?.message}
									</span>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="description">Description</label>
								<Textarea
									id="description"
									{...register('description')}
									placeholder="Description"
								/>
							</div>

							<div className="w-full">
								<div
									className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center text-gray-500 cursor-pointer transition"
									onClick={() => fileInputRef.current.click()}
									onDrop={handleDrop}
									onDragOver={handleDragOver}
								>
									{mounted && image ? (
										<Image
											src={image}
											alt="Product Preview"
											width={160}
											height={160}
											className="object-cover rounded-lg"
										/>
									) : (
										<>
											<UploadCloud className="h-8 w-8 mb-2 text-gray-400" />
											<p className="text-sm text-gray-600 text-center">
												Click to upload or drag and drop
											</p>
											<p className="text-xs text-gray-400 mt-1">
												SVG, PNG, JPG or GIF (MAX. 800×400px)
											</p>
										</>
									)}
									<input
										type="file"
										ref={fileInputRef}
										onChange={handleFileChange}
										accept="image/*"
										className="hidden"
									/>
								</div>
								{errors?.productImage && (
									<span className="text-red-500 text-sm">
										{errors?.productImage?.message}
									</span>
								)}
							</div>

							<div className="flex items-center gap-2">
								<Switch
									checked={activeStatus}
									onCheckedChange={setActiveStatus}
								/>
								<span>Active Status</span>
							</div>

							<Button type="submit">Add Product</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Page;
