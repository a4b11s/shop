import React from 'react';

import cnBind from 'classnames/bind';

import classes from './Pagination.module.css';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const cx = cnBind.bind(classes);

interface IProps {
	count: number;
	current: number;
	onChange?: Function;
}

const Pagination = (props: IProps) => {
	const { count, current, onChange } = props;
	const changePage = (newPage: number) => {
		onChange && onChange(newPage);
	};
	const handleClickOnPageBtn = (value: number) => changePage(value);

	const handleClickOnPrevBtn = () => changePage(current - 1);

	const handleClickOnNextBtn = () => changePage(current + 1);

	return (
		<div className={classes.wrapper}>
			<button
				disabled={current <= 1}
				onClick={handleClickOnPrevBtn}
				className={classes.navBtn}
			>
				<NavigateBeforeIcon />
			</button>
			<div className={classes.pages}>
				{[...Array(count)].map((_, index) => {
					const pageBtnClassNames = cx({
						page: true,
						currentPage: index + 1 === current,
					});

					return (
						<button
							key={'pagP' + index}
							onClick={() => {
								handleClickOnPageBtn(index + 1);
							}}
							className={pageBtnClassNames}
						>
							{index + 1}
						</button>
					);
				})}
			</div>
			<button
				disabled={current >= count}
				onClick={handleClickOnNextBtn}
				className={classes.navBtn}
			>
				<NavigateNextIcon />
			</button>
		</div>
	);
};

export default Pagination;
