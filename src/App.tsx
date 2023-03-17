import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import { routes } from './routes/routes';

import '@fontsource/montserrat';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{routes.map(({ path, name, component: Component, isIndex }) => {
						return (
							<Route index={isIndex} key={name} path={path} element={<Component />} />
						);
					})}
				</Route>
			</Routes>
		</>
	);
};

export default App;
