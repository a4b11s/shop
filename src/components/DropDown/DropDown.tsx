import React, { useState } from 'react';
import cnBind from 'classnames/bind';

import classes from './DropDown.module.css';

interface IProps {
	options: Array<string>;
	disabled?: boolean;
	onSelected?: Function;
	defaultValue?: string;
}

const cx = cnBind.bind(classes);

const calcWidth = (array: Array<string>): number => {
	const wordLength = Math.max(...array.map((el) => el.length)); // calc length of the largest word in the array

	return wordLength * 10;
};

const DropDown = ({
	disabled = false,
	options,
	defaultValue = options[0],
	onSelected,
}: IProps) => {
	const [selectedValue, setSelectedValue] = useState(defaultValue);
	const [isSelecting, setIsSelecting] = useState(false);

	//width DropDown, based on the largest option
	const dropDownWidth = calcWidth([...options, defaultValue]);

	const handleClickOnItem = (value: string) => {
		setSelectedValue(value);
		setIsSelecting(!isSelecting);

		if (onSelected) {
			onSelected(value);
		}
	};

	const handleClickOnDropDownBtn = () => setIsSelecting(!isSelecting);

	const classNames = cx({
		dropDown: true,
		dropDownActive: isSelecting,
	});

	return (
		<div className={classNames}>
			<button
				disabled={disabled}
				onClick={handleClickOnDropDownBtn}
				style={{ width: dropDownWidth }}
				className={classes.button}
			>
				{selectedValue}
			</button>
			<ul className={classes.optionsList}>
				{options.map((option, index) => {
					const classNames = cx({
						optionsListItem: true,
						optionsListItemActive: option === selectedValue,
					});

					return (
						<li
							style={{ width: dropDownWidth }}
							className={classNames}
							key={option + index.toString()}
							onClick={() => handleClickOnItem(option)}
						>
							{option}
						</li>
					);
				})}
			</ul>

			<input
				readOnly
				className={classes.input}
				type="text"
				value={selectedValue}
			/>
		</div>
	);
};

export default DropDown;
