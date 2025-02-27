import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo-container">
          <img src="/japanese/icons/android-chrome-192x192.png" alt="Shiba Study Logo" className="app-logo" />
          <h1>Shiba Study</h1>
        </div>
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