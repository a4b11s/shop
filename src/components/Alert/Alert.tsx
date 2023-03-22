import React from 'react';

import cnBind from 'classnames/bind';

import classes from './Alert.module.css';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const icons = {
	error: <ErrorOutlineIcon />,
	warning: <WarningAmberIcon />,
	info: <InfoOutlinedIcon />,
	success: <CheckCircleOutlineOutlinedIcon />,
};

interface IProps {
	isOpen: boolean;
	message: string | null;
	type: 'error' | 'warning' | 'info' | 'success';
}

const cx = cnBind.bind(classes);

const Alert = ({ type, isOpen, message }: IProps) => {
	if (isOpen) {
		return (
			<div
				className={cx({
					wrapper: true,
					[type]: true,
				})}
			>
				{icons[type]}
				<span>{message ? message : 'Error'}!</span>
			</div>
		);
	} else {
		return null;
	}
};

export default Alert;
