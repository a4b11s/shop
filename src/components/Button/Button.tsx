import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import classes from './Button.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: string;
	children: ReactNode | string;
}

const Button = (props: IProps) => {
	const { onClick = () => {}, children, color, ...otherProps } = props;

	return (
		<button
			{...otherProps}
			style={{ color: color }}
			onClick={(e) => {
				if (otherProps.disabled === true) return;
				onClick(e);
			}}
			className={classes.button}
		>
			{children}
		</button>
	);
};

export default Button;
