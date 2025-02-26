import { useState, useEffect } from 'react';
import { match } from 'path-to-regexp';
import { EVENTS } from './consts.js';

export default function Router({
	routes = [],
	defaultComponent: DefaultComponent = () => <h1>404</h1>
}) {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};

		window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
		window.addEventListener(EVENTS.POPSTATE, onLocationChange);

		return () => {
			window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
			window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
		};
	}, []);

	let routeParams;

	const Page = routes.find(({ path }) => {
		if (path === currentPath) return true;

		const URLMatcher = match(path, { decode: decodeURIComponent });
		const isMatch = URLMatcher(currentPath);

		if (!isMatch) return false;

		routeParams = isMatch.params;

		return true;
	})?.Component;

	return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />;
}
