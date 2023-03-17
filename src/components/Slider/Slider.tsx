import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import classes from './Slider.module.css';

interface IProps {
	images: Array<string>;
	slideSize: number;
}

const Slider = ({ images, slideSize }: IProps) => {
	const [currentPos, setCurrentPos] = useState(0);

	const handleSwipeLeft = () => {
		if (currentPos > 0) {
			setCurrentPos(currentPos - 1);
		} else {
			setCurrentPos(images.length - 1);
		}
	};

	const handleSwipeRight = () => {
		if (currentPos < images.length - 1) {
			setCurrentPos(currentPos + 1);
		} else {
			setCurrentPos(0);
		}
	};

	return (
		<div className={classes.wrapper}>
			<div
				className={classes.slider}
				style={{ width: slideSize, height: slideSize - slideSize / 4 }}
			>
				<div
					style={{ width: slideSize, height: slideSize - slideSize / 4 }}
					className={classes.holder}
				>
					<ul
						style={{
							transform: `translate3d(-${slideSize * currentPos}px, 0px, 0px)`,
						}}
						className={classes.slides}
					>
						{images.map((img) => {
							return (
								<li
									key={img}
									style={{
										width: slideSize,
										height: slideSize - slideSize / 4,
									}}
									className={classes.slide}
								>
									<img src={img} alt="slide" />
								</li>
							);
						})}
					</ul>
				</div>
				<nav className={classes.navigation}>
					<button onClick={handleSwipeLeft}>
						<ArrowBackIcon />
					</button>
					<button onClick={handleSwipeRight}>
						<ArrowForwardIcon />
					</button>
				</nav>
			</div>
			<ul
				style={{
					width: slideSize,
					justifyContent: images.length > 2 ? 'space-between' : 'flex-start',
				}}
				className={classes.miniatureNav}
			>
				{images.map((img, index) => {
					return (
						<li
							key={img + 'miniature'}
							style={{ width: slideSize / (images.length + 2) }}
							className={
								classes.minSlide +
								' ' +
								(index === currentPos ? classes.minSlideActive : '')
							}
							onClick={() => {
								setCurrentPos(index);
							}}
						>
							<img src={img} alt="slide" />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Slider;
