import { Link } from 'react-router-dom';
import { useDeck } from '../context/DeckContext';

export default function Home() {
  const { decks, loading, error } = useDeck();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h2>Japanese Flashcard Decks</h2>
      <p>Select a deck to start practicing:</p>
      
      <div className="deck-list">
        {decks.map((deck) => (
          <Link 
            to={`/deck/${deck.id}`} 
            key={deck.id}
            className="deck-card"
          >
            <h3>{deck.title}</h3>
            <p>{deck.count > 0 ? `${deck.count} sentences` : 'Loading...'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 