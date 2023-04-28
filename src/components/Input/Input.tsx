import React, {
	ChangeEvent,
	InputHTMLAttributes,
	useRef,
	useState,
} from 'react';

import cnBind from 'classnames/bind';

import classes from './Input.module.css';

const cx = cnBind.bind(classes);

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	errorMessage?: string;
	value?: string | number;
	autocomplete?: Array<string>;
}

const Input = (props: IProps) => {
	const {
		errorMessage,
		onChange = () => {},
		value = '',
		label,
		autocomplete,
		...otherProps
	} = props;
	const [inputValue, setInputValue] = useState(value);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChange(e);
	};

	const handleAutoCompleteClick = (autocompleteItem: string) => {
		setInputValue(autocompleteItem);

		if (inputRef.current) {
			const valueSetter = Object.getOwnPropertyDescriptor(
				inputRef.current,
				'value'
			)?.set;
			const prototype = Object.getPrototypeOf(inputRef.current);
			const prototypeValueSetter = Object.getOwnPropertyDescriptor(
				prototype,
				'value'
			)?.set;

			if (valueSetter && valueSetter !== prototypeValueSetter) {
				prototypeValueSetter?.call(inputRef.current, autocompleteItem);
			} else {
				valueSetter?.call(inputRef.current, autocompleteItem);
			}

			const event = new Event('input', { bubbles: true });
			inputRef.current.dispatchEvent(event);
		}
	};

	return (
		<>
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
					ref={inputRef}
					onChange={handleChange}
					value={inputValue}
					className={classes.input}
					{...otherProps}
				/>
				{errorMessage && (
					<span className={classes.errorMessage}>{errorMessage}</span>
				)}
				{autocomplete && (
					<ul className={classes.autocomplete}>
						{autocomplete.map((item) => {
							if (!item.toLowerCase().includes(inputValue.toString().toLowerCase())) {
								return undefined;
							}

							if (item.toLowerCase() === inputValue.toString().toLowerCase()) {
								return undefined;
							}

							return (
								<li
									className={classes.autocompleteItem}
									onClick={() => {
										handleAutoCompleteClick(item);
									}}
									key={item}
								>
									{item}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</>
	);
};

export default Input;
