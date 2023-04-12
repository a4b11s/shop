import * as Yup from 'yup';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const orderValidationSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Too Short!')
		.max(70, 'Too Long!')
		.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	deliveryAddress: Yup.string().min(3, 'Too Short!').required('Required'),
	phone: Yup.string()
		.matches(phoneRegExp, 'Invalid phone number')
		.required('Required'),
});

export const authorizationValidationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(6, 'Too Short!').required('Required'),
});
