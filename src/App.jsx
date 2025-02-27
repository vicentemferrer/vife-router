import { lazy, Suspense } from 'react';

import Router from './Router.jsx';
import Route from './Route.jsx';

import './App.css';

const HomePage = lazy(() => import('./pages/Home.jsx'));
const AboutPage = lazy(() => import('./pages/About.jsx'));
const SearchPage = lazy(() => import('./pages/Search.jsx'));
const Page404 = lazy(() => import('./pages/404.jsx'));

const routes = [
	{
		path: '/:lang/about',
		Component: AboutPage
	},
	{
		path: '/search/:query',
		Component: SearchPage
	}
];

function App() {
	return (
		<main>
			<Suspense fallback={<div>Loading ...</div>}>
				<Router routes={routes} defaultComponent={Page404}>
					<Route path='/' Component={HomePage} />
					<Route path='/about' Component={AboutPage} />
				</Router>
			</Suspense>
		</main>
	);
}

export default App;
