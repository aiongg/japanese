import { Sentence, SRSData, StudySession } from '../types';

// Debug configuration (matching service pattern)
const DEBUG = true;
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[STORAGE SERVICE]', ...args);
  }
}

// Daily stats interface
interface DeckStats {
  lastStudyDate: string;  // ISO string
  cardsStudied: number;
  newCardsStudied: number;
  reviewsCompleted: number;
}

class StorageService {
  private static instance: StorageService;
  
  private constructor() {
    debugLog('Storage service initialized');
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // Key generation methods
  private getDeckProgressKey(deckId: string): string {
    return `deck_progress_${deckId}`;
  }

  private getSessionKey(deckId: string): string {
    return `study_session_${deckId}`;
  }

  private getDeckStatsKey(deckId: string): string {
    return `deck_stats_${deckId}`;
  }

  // SRS Data Storage
  saveDeckProgress(deckId: string, cards: Sentence[]): void {
    try {
      const srsData = cards.map(card => ({
        id: card.id,
        srs: card.srs
      }));
      localStorage.setItem(
        this.getDeckProgressKey(deckId), 
        JSON.stringify(srsData)
      );
      debugLog('Saved deck progress for:', deckId);
    } catch (error) {
      console.error('Error saving deck progress:', error);
      throw new Error('Failed to save deck progress');
    }
  }

  getDeckProgress(deckId: string): Record<string, SRSData> {
    try {
      const data = localStorage.getItem(this.getDeckProgressKey(deckId));
      if (!data) {
        debugLog('No existing progress found for deck:', deckId);
        return {};
      }

      const srsData = JSON.parse(data) as Array<{ id: string; srs: SRSData }>;
      debugLog('Loaded deck progress for:', deckId);
      return Object.fromEntries(srsData.map(item => [item.id, item.srs]));
    } catch (error) {
      console.error('Error loading deck progress:', error);
      return {};
    }
  }

  // Study Session Storage
  saveSession(deckId: string, session: StudySession): void {
    try {
      localStorage.setItem(
        this.getSessionKey(deckId),
        JSON.stringify(session)
      );
      debugLog('Saved study session for:', deckId);
    } catch (error) {
      console.error('Error saving study session:', error);
      throw new Error('Failed to save study session');
    }
  }

  getSession(deckId: string): StudySession | null {
    try {
      const data = localStorage.getItem(this.getSessionKey(deckId));
      if (!data) {
        debugLog('No existing session found for deck:', deckId);
        return null;
      }

      const session = JSON.parse(data) as StudySession;
      debugLog('Loaded study session for:', deckId);
      return session;
    } catch (error) {
      console.error('Error loading study session:', error);
      return null;
    }
  }

  clearSession(deckId: string): void {
    try {
      localStorage.removeItem(this.getSessionKey(deckId));
      debugLog('Cleared study session for:', deckId);
    } catch (error) {
      console.error('Error clearing study session:', error);
    }
  }

  // Daily Stats Storage
  saveDeckStats(deckId: string, stats: DeckStats): void {
    try {
      localStorage.setItem(
        this.getDeckStatsKey(deckId),
        JSON.stringify(stats)
      );
      debugLog('Saved deck stats for:', deckId);
    } catch (error) {
      console.error('Error saving deck stats:', error);
      throw new Error('Failed to save deck stats');
    }
  }

  getDeckStats(deckId: string): DeckStats {
    try {
      const data = localStorage.getItem(this.getDeckStatsKey(deckId));
      if (!data) {
        debugLog('No existing stats found for deck:', deckId);
        return {
          lastStudyDate: new Date().toISOString(),
          cardsStudied: 0,
          newCardsStudied: 0,
          reviewsCompleted: 0
        };
      }

      const stats = JSON.parse(data) as DeckStats;
      debugLog('Loaded deck stats for:', deckId);
      return stats;
    } catch (error) {
      console.error('Error loading deck stats:', error);
      return {
        lastStudyDate: new Date().toISOString(),
        cardsStudied: 0,
        newCardsStudied: 0,
        reviewsCompleted: 0
      };
    }
  }

  // General storage utilities
  clear(): void {
    try {
      localStorage.clear();
      debugLog('Cleared all storage');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  clearDeckData(deckId: string): void {
    try {
      localStorage.removeItem(this.getDeckProgressKey(deckId));
      localStorage.removeItem(this.getSessionKey(deckId));
      localStorage.removeItem(this.getDeckStatsKey(deckId));
      debugLog('Cleared all data for deck:', deckId);
    } catch (error) {
      console.error('Error clearing deck data:', error);
    }
  }
}

// Export singleton instance
export const storageService = StorageService.getInstance(); 