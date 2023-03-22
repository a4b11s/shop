import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';

import cnBind from 'classnames/bind';

import classes from './Input.module.css';

const cx = cnBind.bind(classes);

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	errorMessage?: string;
	value?: string | number;
}

const Input = ({
	errorMessage,
	onChange = () => {},
	value = '',
	label,
	...props
}: IProps) => {
	const [inputValue, setInputValue] = useState(value);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChange(e);
	};

	return (
		<div
			className={cx({
				inputWrapper: true,
				inputWrapperError: errorMessage,
				inputWrapperNotEmpty: value,
			})}
		>
			<label className={classes.label} htmlFor={props.id}>
				{label}
			</label>
			<input
				onChange={handleChange}
				{...props}
				value={inputValue}
				className={classes.input}
			/>
			{errorMessage && (
				<span className={classes.errorMessage}>{errorMessage}</span>
			)}
		</div>
	);
};

export default Input;
