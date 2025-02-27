import { useState, useEffect, Children } from 'react';
import { match } from 'path-to-regexp';
import { EVENTS } from './consts.js';
import { getCurrentPath } from './utils.js';

export default function Router({
	routes = [],
	defaultComponent: DefaultComponent = () => <h1>404</h1>,
	children
}) {
	const [currentPath, setCurrentPath] = useState(getCurrentPath());

	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(getCurrentPath());
		};

		window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
		window.addEventListener(EVENTS.POPSTATE, onLocationChange);

		return () => {
			window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
			window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
		};
	}, []);

	let routeParams;

	const childrenRoutes = Children.map(children, ({ props, type: { name } }) =>
		name === 'Route' ? props : null
	);

	const routesToUse = routes.concat(childrenRoutes).filter(Boolean);

	const Page = routesToUse.find(({ path }) => {
		if (path === currentPath) return true;

		const URLMatcher = match(path, { decode: decodeURIComponent });
		const isMatch = URLMatcher(currentPath);

		if (!isMatch) return false;

		routeParams = isMatch.params;

		return true;
	})?.Component;

	return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />;
}
