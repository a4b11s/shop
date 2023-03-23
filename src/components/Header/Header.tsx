import React, { useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '../../routes/routes';
import Button from '../Button/Button';
import Auth from '../Auth/Auth';
import Modal from '../Modal/Modal';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import DropDawnMenuItem from '../DropDownMenu/DropDawnMenuItem';

import { removeUser } from '../../store/customerSlice';
import { useAppDispatch } from '../../store/store';

import { useAuth } from '../../hooks/use-auth';

import styles from './Header.module.css';

const Header = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuth, photoURL } = useAuth();
	const [isLogging, setIsLogging] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const handleClickLoginBtn = () => {
		setIsLogging(true);
	};

	const handleLogin = () => {
		setIsLogging(false);
	};
	const handleClickAvatar = () => {
		setIsUserMenuOpen(true);
	};

	const handleLogout = () => {
		dispatch(removeUser());
	};

	return (
		<>
			<Modal
				onClose={() => {
					setIsLogging(false);
				}}
				title="Auth"
				isOpen={isLogging && !isAuth}
			>
				<Auth onAuth={handleLogin} />
			</Modal>
			<header className={styles.wrapper}>
				<nav className={styles.nav}>
					{publicRoutes.map(({ path, name, isShowInMenu }) => {
						return isShowInMenu ? (
							<NavLink data-testid="link" key={name} className={styles.link} to={path}>
								{name}
							</NavLink>
						) : (
							''
						);
					})}
				</nav>
				{isAuth ? (
					<div className={styles.user}>
						<img
							onClick={handleClickAvatar}
							className={styles.avatar}
							alt="avatar"
							src={photoURL || ''}
						/>
						<DropDownMenu isOpen={isUserMenuOpen}>
							{privateRoutes.map(({ path, isShowInMenu, name }) => {
								if (!isShowInMenu) return null;

								return (
									<DropDawnMenuItem
										key={path}
										onClick={() => {
											setIsUserMenuOpen(false);
											navigate(path);
										}}
									>
										{name}
									</DropDawnMenuItem>
								);
							})}
							<DropDawnMenuItem onClick={handleLogout}>Log out</DropDawnMenuItem>
						</DropDownMenu>
					</div>
				) : (
					<>
						<Button color="white" onClick={handleClickLoginBtn}>
							Login
						</Button>
					</>
				)}
			</header>
		</>
	);
};

export default Header;
