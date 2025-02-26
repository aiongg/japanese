import { useState, useEffect } from 'react';
import { Sentence } from '../types';
import { marked } from 'marked';

// Configure marked for better table rendering
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown - enables tables
  breaks: true
});

console.log('Marked configuration updated');

interface FlashcardProps {
  sentence: Sentence;
  showAnswerByDefault: boolean;
  onNext: () => void;
}

export default function Flashcard({ sentence, showAnswerByDefault, onNext }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(showAnswerByDefault);
  const [renderedHTML, setRenderedHTML] = useState('');
  
  // Update showAnswer when showAnswerByDefault changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
  }, [showAnswerByDefault]);
  
  // Reset showAnswer when sentence changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
  }, [sentence, showAnswerByDefault]);

  // Render markdown when sentence changes
  useEffect(() => {
    console.log('Sentence changed:', sentence.id);
    console.log('Raw gloss table:', sentence.glossTable);
    
    // Check if the gloss table contains a table
    const hasTable = sentence.glossTable.includes('|') && sentence.glossTable.includes('---');
    console.log('Contains table:', hasTable);
    
    // Ensure the markdown is properly formatted for tables
    try {
      const result = marked(sentence.glossTable);
      // Handle both string and Promise results
      if (typeof result === 'string') {
        console.log('Rendered HTML preview:', result.substring(0, 100) + '...');
        setRenderedHTML(result);
      } else {
        // Handle Promise result
        result.then(html => {
          console.log('Rendered HTML preview (from promise):', html.substring(0, 100) + '...');
          setRenderedHTML(html);
        });
      }
    } catch (error) {
      console.error('Error rendering markdown:', error);
      setRenderedHTML('<p>Error rendering table</p>');
    }
  }, [sentence]);

  const handleClick = () => {
    if (showAnswerByDefault) {
      // If answers are shown by default, just go to next card
      onNext();
    } else if (showAnswer) {
      // If answer is already showing, go to next card
      onNext();
    } else {
      // If answer is hidden, show it
      setShowAnswer(true);
    }
  };

  return (
    <div 
      className="flashcard"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="japanese-text">
        {sentence.japanese}
      </div>
      
      <div className={`answer ${showAnswer ? '' : 'hidden'}`}>
        <div className="english-text">{sentence.english}</div>
        
        {sentence.notes && (
          <div className="notes">{sentence.notes}</div>
        )}
        
        <div 
          className="gloss-table-container"
          dangerouslySetInnerHTML={{ __html: renderedHTML }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks on table from triggering card click
        />
      </div>
    </div>
  );
} 