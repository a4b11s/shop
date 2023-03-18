import React from 'react';

const Footer = () => {
	const createdYear = 2023;
	const yearNow = new Date(Date.now()).getFullYear();

	return (
		<footer style={{ margin: 20, textAlign: 'center' }}>
			{createdYear === yearNow ? yearNow : `${createdYear} - ${yearNow}`}
		</footer>
	);
};

export default Footer;
