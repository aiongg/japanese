Now update the pages-app flashcards to play the audio files.

Finding the audio files:
- Audio files are located in the `sentences/audio` directory.
- Each numbered sentence may have 2 files, an -A.mp3 file with Japanese, and and a -B.mp3 file with English.
- Some sentences may be missing one or both of the audio files.
- Example: sentence number 20 has two files, 0020A.mp3 for Japanese, and 0020B.mp3 for English.
- Don't forget to update the copy script and build script to make these audio files available in the app.

Viewing flashcards:
- Add a "play audio" toggle when viewing the flashcards. When enabled, the Japanese audio should play when the user sees the flashcard. When disabled, do not play any audio automatically, but allow the user to click a button below the flashcard to play the Japanese audio. We do not need a button for the English audio.

Listen mode:
- Add a new mode called "Listen" for viewing the flashcards.
- When in Listen mode, play the Japanese audio automatically, pause for 1 second (make this time easily configurable), and then reveal the answer and play the English audio.
- Again pause briefly after the English audio and then advance to the next flashcard automatically.
- The app should continue to play in the background even if the user navigates to a different app or tab.

---

