import { Sentence, SRSData, SRSResponse, StudySession } from '../types';
import { storageService } from './storageService';

// Debug configuration (matching service pattern)
const DEBUG = true;
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[SRS SERVICE]', ...args);
  }
}

class SRSService {
  private static instance: SRSService;
  
  private constructor() {
    debugLog('SRS service initialized');
  }

  static getInstance(): SRSService {
    if (!SRSService.instance) {
      SRSService.instance = new SRSService();
    }
    return SRSService.instance;
  }

  // Core SRS algorithm methods
  calculateNextInterval(card: Sentence, response: SRSResponse): number {
    // Ensure card has SRS data
    const srs = card.srs || this.initializeCard();
    const { repetitions, easeFactor } = srs;
    
    switch (response) {
      case 'failed':
        return 0;
      case 'passed':
        if (repetitions <= 3) return 1;
        return Math.round(srs.interval * easeFactor);
      case 'easy':
        if (repetitions === 0) return 2;
        return Math.round(srs.interval * easeFactor);
      default:
        return 0;
    }
  }

  adjustEaseFactor(card: Sentence, response: SRSResponse): number {
    // Ensure card has SRS data
    const srs = card.srs || this.initializeCard();
    let newEaseFactor = srs.easeFactor;
    
    switch (response) {
      case 'failed':
        newEaseFactor -= 0.2;
        break;
      case 'passed':
        newEaseFactor -= 0.1;
        break;
      case 'easy':
        newEaseFactor += 0.1;
        break;
    }
    
    // Clamp between 1.3 and 2.5
    return Math.min(Math.max(newEaseFactor, 1.3), 2.5);
  }

  // Card state management
  updateCard(deckId: string, card: Sentence, response: SRSResponse): Sentence {
    // Ensure card has SRS data
    const srs = card.srs || this.initializeCard();
    const interval = this.calculateNextInterval(card, response);
    const easeFactor = this.adjustEaseFactor(card, response);
    const repetitions = response === 'failed' ? 0 : srs.repetitions + 1;
    
    const updatedCard = {
      ...card,
      srs: {
        interval,
        easeFactor,
        dueDate: this.calculateDueDate(interval),
        repetitions,
        timesSeen: srs.timesSeen + 1,
        lastResponse: response
      }
    };

    // Update stats
    const stats = storageService.getDeckStats(deckId);
    const isNewCard = srs.timesSeen === 0;
    
    storageService.saveDeckStats(deckId, {
      ...stats,
      cardsStudied: stats.cardsStudied + 1,
      newCardsStudied: stats.newCardsStudied + (isNewCard ? 1 : 0),
      reviewsCompleted: stats.reviewsCompleted + 1,
      lastStudyDate: new Date().toISOString()
    });

    return updatedCard;
  }

  // Helper methods
  private calculateDueDate(interval: number): string {
    const date = new Date();
    date.setDate(date.getDate() + interval);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  }

  isDue(card: Sentence): boolean {
    // Ensure card has SRS data
    const srs = card.srs || this.initializeCard();
    if (!srs.dueDate) return true; // New card
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return new Date(srs.dueDate) <= now;
  }

  // Initialize a new card with default SRS data
  initializeCard(): SRSData {
    return {
      interval: 0,
      easeFactor: 2.5,
      dueDate: null,
      repetitions: 0,
      timesSeen: 0,
      lastResponse: 'unseen'
    };
  }

  // Fisher-Yates shuffle algorithm
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Session management
  createSession(deck: Sentence[], maxNewCards: number = 20): StudySession {
    debugLog('Creating new session with deck:', deck);
    const now = new Date().toISOString();
    
    // Ensure all cards have SRS data
    const initializedDeck = deck.map(card => ({
      ...card,
      srs: card.srs || this.initializeCard()
    }));
    
    const [dueCards, newCards] = this.partitionCards(initializedDeck);
    debugLog('Partitioned cards:', { dueCards, newCards });
    
    // Combine due cards and new cards up to maxNewCards
    const upcomingCards = this.shuffleArray([
      ...dueCards.map(c => c.id),
      ...newCards.slice(0, maxNewCards).map(c => c.id)
    ]);

    const session = {
      deckId: deck[0]?.id.split('/')[0] ?? '', // Assuming deck ID is first part of sentence ID
      upcomingCards,
      doneCards: [],
      currentCardIndex: 0,
      totalCardsInSession: upcomingCards.length,
      startTime: now,
      lastStudied: now
    };

    // Save the session
    storageService.saveSession(session.deckId, session);
    return session;
  }

  // Continue session with additional cards
  continueSession(deck: Sentence[], session: StudySession, additionalCards: number): StudySession {
    debugLog('Continuing session with additional cards:', additionalCards);
    
    // Move all done cards back to upcoming cards
    let upcomingCards = [...session.doneCards];
    session.doneCards = [];

    // Get new cards if needed
    const [dueCards, newCards] = this.partitionCards(
      deck.filter(card => !upcomingCards.includes(card.id))
    );

    // Add new cards up to the requested amount
    const remainingSlots = additionalCards - upcomingCards.length;
    if (remainingSlots > 0) {
      const additionalCardIds = [
        ...dueCards.map(c => c.id),
        ...newCards.map(c => c.id)
      ].slice(0, remainingSlots);
      
      upcomingCards = [...upcomingCards, ...additionalCardIds];
    }

    // Shuffle the upcoming cards
    upcomingCards = this.shuffleArray(upcomingCards);

    const updatedSession = {
      ...session,
      upcomingCards,
      currentCardIndex: 0,
      totalCardsInSession: upcomingCards.length,
      lastStudied: new Date().toISOString()
    };

    // Save the updated session
    storageService.saveSession(updatedSession.deckId, updatedSession);
    return updatedSession;
  }

  private partitionCards(deck: Sentence[]): [Sentence[], Sentence[]] {
    return deck.reduce<[Sentence[], Sentence[]]>(
      ([due, new_], card) => {
        // Ensure card has SRS data
        const srs = card.srs || this.initializeCard();
        if (!srs.dueDate) {
          return [due, [...new_, card]];
        }
        return this.isDue(card) ? [[...due, card], new_] : [due, new_];
      },
      [[], []]
    );
  }

  // Load and save progress using storage service
  loadDeckProgress(deckId: string): Record<string, SRSData> {
    return storageService.getDeckProgress(deckId);
  }

  saveDeckProgress(deckId: string, cards: Sentence[]): void {
    storageService.saveDeckProgress(deckId, cards);
  }

  // Session management using storage service
  loadSession(deckId: string): StudySession | null {
    return storageService.getSession(deckId);
  }

  saveSession(deckId: string, session: StudySession): void {
    storageService.saveSession(deckId, session);
  }

  clearSession(deckId: string): void {
    storageService.clearSession(deckId);
  }
}

// Export singleton instance
export const srsService = SRSService.getInstance(); 