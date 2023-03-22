import React, { ReactNode } from 'react';

import cnBind from 'classnames/bind';

import classes from './DropDownMenu.module.css';

interface IProps {
	children: Array<ReactNode>;
	isOpen: boolean;
}

const cx = cnBind.bind(classes);

const DropDownMenu = ({ isOpen, children }: IProps) => {
	if (!isOpen) return null;

	const listClassNames = cx({
		menuItemList: true,
		menuItemListActive: isOpen,
	});

	return (
		<ul className={listClassNames}>
			{Array.isArray(children) ? children.map((menuItem) => menuItem) : children}
		</ul>
	);
};

export default DropDownMenu;
