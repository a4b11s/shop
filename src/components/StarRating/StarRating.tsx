import React from 'react';

import classes from './StarRating.module.css';
import Star from './Star';

interface IProps {
	rating: number;
}

const StarRating = (props: IProps) => {
	const { rating } = props;
	return (
		<div className={classes.wrapper}>
			{[...Array(5)].map((_, index) => {
				if (rating > index && rating < index + 1)
					return <Star key={index + 'Rating'} type={'half'} />;

				return (
					<Star
						key={index + 'Rating'}
						type={index < Math.floor(rating) ? 'full' : 'empty'}
					/>
				);
			})}
		</div>
	);
};

export default StarRating;
