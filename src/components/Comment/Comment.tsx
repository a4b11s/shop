import React from 'react';

import { IComment } from '../../models';

import classes from './Comment.module.css';

interface IProps {
	comment: IComment;
}

const Comment = (props: IProps) => {
	const { user, body } = props.comment;

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<span className={classes.avatar}>{user.username[0]}</span>
				<span className={classes.nickname}>{user.username}</span>
			</div>
			<div className={classes.body}>{body}</div>
		</div>
	);
};

export default Comment;
