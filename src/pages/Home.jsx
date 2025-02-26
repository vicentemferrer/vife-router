import { Link } from '../Link.jsx';

export default function HomePage() {
	return (
		<>
			<h1>Home</h1>
			<p>Página de ejemplo para la demo</p>
			<Link to='/about'>Sobre nosotros</Link>
		</>
	);
}
