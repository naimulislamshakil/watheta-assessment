import * as yup from 'yup';

const orderSchema = yup.object().shape({
	products: yup.array().min(1, 'Select at least one product').required(),
	quantity: yup
		.number()
		.typeError('Quantity must be a number')
		.positive('Quantity must be positive')
		.required('Quantity is required'),
	clientName: yup.string().required('Client name is required'),
	deliveryAddress: yup.string().required('Delivery address is required'),
	paymentStatus: yup.string().required('Payment status is required'),
	deliveryStatus: yup.string().required('Delivery status is required'),
	expectedDeliveryDate: yup
		.string()
		.required('Expected delivery date is required'),
});

export default orderSchema;
