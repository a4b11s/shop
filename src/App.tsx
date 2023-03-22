import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Error from './views/Error/Error';
import '@fontsource/montserrat';
import { useAuth } from './hooks/use-auth';
import { privateRoutes, publicRoutes } from './routes/routes';
import { Layout } from './Layout';

const App = () => {
	const { isAuth } = useAuth();

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{publicRoutes.map(({ path, name, component: Component, isHomePage }) => {
						return (
							<Route
								index={isHomePage}
								key={name}
								path={path}
								element={<Component />}
							/>
						);
					})}
					{privateRoutes.map(({ path, name, component: Component, isHomePage }) => {
						return (
							<Route
								index={isHomePage}
								key={name}
								path={path}
								element={isAuth ? <Component /> : <Error error={'Access denied'} />}
							/>
						);
					})}
				</Route>
			</Routes>
		</>
	);
};

export default App;
