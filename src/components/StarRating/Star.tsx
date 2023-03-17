import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface IProps {
	type: 'full' | 'empty' | 'half';
}

const Star = ({ type }: IProps) => {
	const color = 'rgb(250, 175, 0)';

	if (type === 'full') return <StarIcon sx={{ fill: color }} />;

	if (type === 'half') return <StarHalfIcon sx={{ fill: color }} />;

	if (type === 'empty') return <StarOutlineIcon sx={{ fill: color }} />;

	return null;
};

export default Star;
