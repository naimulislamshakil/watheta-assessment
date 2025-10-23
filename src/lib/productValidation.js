import * as yup from 'yup';

export const productSchema = yup.object({
	productName: yup.string().required('Product Name is required').trim(),

	sku: yup.string().required('SKU is required'),
	category: yup
		.string()
		.oneOf(['Electronics', 'Furniture', 'Clothing'], 'Invalid Category')
		.required('Category is required'),

	price: yup
		.number()
		.typeError('Price must be a number')
		.required('Price is required')
		.min(0, 'Price must be greater than or equal to 0'),

	stockQuantity: yup
		.number()
		.typeError('Stock Quantity must be a number')
		.required('Stock Quantity is required')
		.min(0, 'Stock Quantity must be >= 0'),

	description: yup.string().optional(),

	productImage: yup
		.mixed()
		.test('fileSize', 'File too large', (value) => {
			if (!value?.[0]) return true; // optional
			return value[0].size <= 5 * 1024 * 1024; // max 5MB
		})
		.test('fileType', 'Unsupported File Format', (value) => {
			if (!value?.[0]) return true;
			return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
		}),
	activeStatus: yup.boolean().default(true),
});
