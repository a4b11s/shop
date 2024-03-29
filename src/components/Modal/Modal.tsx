import React, { MouseEvent, ReactNode, useRef } from 'react';

import classes from './Modal.module.css';

import CloseIcon from '@mui/icons-material/Close';

interface IProps {
	title: string;
	actions?: ReactNode;
	children: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}

const Modal = (props: IProps) => {
	const { title, children, onClose = () => {}, actions, isOpen } = props;
	const backdrop = useRef<HTMLDivElement>(null);

	const handleClose = (e: MouseEvent) => {
		e.stopPropagation();
		if (e.target === backdrop.current) onClose();
	};

	if (!isOpen) return null;

	return (
		<div ref={backdrop} onClick={handleClose} className={classes.backdrop}>
			<div className={classes.wrapper}>
				<div className={classes.header}>
					<h1 className={classes.title}>{title}</h1>
					<button onClick={onClose} className={classes.closeBtn}>
						<CloseIcon />
					</button>
				</div>
				<div className={classes.content}>{children}</div>
				{actions && <div className={classes.actions}>{actions}</div>}
			</div>
		</div>
	);
};

export default Modal;
