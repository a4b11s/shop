import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import classes from './Alert.module.css';

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

const Alert = ({ type, isOpen, message }: IProps) => {
	if (isOpen) {
		return (
			<div className={classes.wrapper + ' ' + classes[type]}>
				{icons[type]}
				<span>{message ? message : 'Error'}!</span>
			</div>
		);
	} else {
		return null;
	}
};

export default Alert;
