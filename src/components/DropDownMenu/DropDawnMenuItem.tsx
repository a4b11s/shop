import React, { MouseEventHandler } from 'react';

import classes from './DropDownMenu.module.css';

interface IProps {
	children: string;
	onClick?: MouseEventHandler<HTMLLIElement>;
}

const DropDawnMenuItem = (props: IProps) => {
	const { onClick = () => {}, children } = props;

	return (
		<li onClick={onClick} className={classes.menuItem}>
			{children}
		</li>
	);
};

export default DropDawnMenuItem;
