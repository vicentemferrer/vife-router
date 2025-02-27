import { Link } from '../Link.jsx';

const i18n = {
	es: {
		title: 'Sobre nosotros',
		description: 'Me llamo Vicente y estoy creando un clon de React Router',
		button: 'Ir al Inicio'
	},
	en: {
		title: 'About us',
		description: "My name is Vicente and I'm creating a React Router clone",
		button: 'Go to Home'
	}
};

const useI18N = (lang) => i18n[lang] || i18n.en;

export default function AboutPage({ routeParams }) {
	const i18n = useI18N(routeParams?.lang || 'es');

	return (
		<>
			<h1>{i18n.title}</h1>
			<p>{i18n.description}</p>
			<Link to='/'>{i18n.button}</Link>
		</>
	);
}
