import React from 'react';

import classes from './Button.module.css';

interface IProps {
	color?: string;
	children: JSX.Element | string;
	onClick?: Function;
	disabled?: boolean;
	type?: 'submit' | 'reset' | 'button';
}

const Button = ({
	type,
	disabled,
	onClick = () => {},
	children,
	color,
}: IProps) => {
	return (
		<button
			type={type}
			style={{ color: color }}
			disabled={disabled}
			onClick={(e) => {
				onClick(e);
			}}
			className={classes.button}
		>
			{children}
		</button>
	);
};

export default Button;
