import React, { ButtonHTMLAttributes } from 'react';

import classes from './Button.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: string;
	children: JSX.Element | string;
}

const Button = ({
	onClick = () => {},
	children,
	color,
	...otherProps
}: IProps) => {
	return (
		<button
			{...otherProps}
			style={{ color: color }}
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
