import React from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../../routes/routes';

import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.wrapper}>
			<nav className={styles.nav}>
				{routes.map(({ path, name, isShow }) => {
					return isShow ? (
						<NavLink data-testid="link" key={name} className={styles.link} to={path}>
							{name}
						</NavLink>
					) : (
						''
					);
				})}
			</nav>
		</header>
	);
};

export default Header;
