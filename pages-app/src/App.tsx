import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DeckProvider } from './context/DeckContext';
import Header from './components/Header';
import Home from './components/Home';
import DeckView from './components/DeckView';
import './index.css';

function App() {
  return (
    <Router basename="/japanese">
      <DeckProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deck/:deckId" element={<DeckView />} />
          </Routes>
        </main>
      </DeckProvider>
    </Router>
  );
}

export default App;
