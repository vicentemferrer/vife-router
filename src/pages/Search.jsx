import { Link } from '../Link.jsx';

export default function SearchPage({ routeParams }) {
	return (
		<>
			<h1>Has buscado: {routeParams.query}</h1>
			<Link to='/'>Volver al Inicio</Link>
		</>
	);
}
