import { Link } from 'react-router-dom';

export default function NotFoundPage(): JSX.Element {
  return (
    <section className="game__screen">
      <h1>404. Page not found</h1>
      <Link to="/">Back to main page</Link>
    </section>
  );
}
