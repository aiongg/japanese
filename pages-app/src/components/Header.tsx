import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1>Japanese Flashcards</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 