import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust paths based on the current directory structure
const sourcePath = path.join(__dirname, '../../sentences');
const destPath = path.join(__dirname, '../public/sentences');
const sourceAudioPath = path.join(sourcePath, 'audio');
const destAudioPath = path.join(destPath, 'audio');

console.log('Source path:', sourcePath);
console.log('Destination path:', destPath);
console.log('Source audio path:', sourceAudioPath);
console.log('Destination audio path:', destAudioPath);

// Create destination directories if they don't exist
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
  console.log('Created destination directory:', destPath);
}

if (!fs.existsSync(destAudioPath)) {
  fs.mkdirSync(destAudioPath, { recursive: true });
  console.log('Created audio destination directory:', destAudioPath);
}

// Check if source directory exists
if (!fs.existsSync(sourcePath)) {
  console.error('Source directory does not exist:', sourcePath);
  process.exit(1);
}

// Copy all markdown files from sentences directory
try {
  const files = fs.readdirSync(sourcePath);
  console.log('Found files in source directory:', files);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const sourceFile = path.join(sourcePath, file);
      const destFile = path.join(destPath, file);
      fs.copyFileSync(sourceFile, destFile);
      console.log(`Copied ${file} to public/sentences/`);
    }
  });
  
  console.log('All sentence files copied successfully!');
} catch (error) {
  console.error('Error copying markdown files:', error);
  process.exit(1);
}

// Copy all audio files from sentences/audio directory if it exists
if (fs.existsSync(sourceAudioPath)) {
  try {
    const audioFiles = fs.readdirSync(sourceAudioPath);
    console.log('Found audio files in source directory:', audioFiles.length);
    
    audioFiles.forEach(file => {
      if (file.endsWith('.mp3')) {
        const sourceFile = path.join(sourceAudioPath, file);
        const destFile = path.join(destAudioPath, file);
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Copied audio file ${file} to public/sentences/audio/`);
      }
    });
    
    console.log('All audio files copied successfully!');
  } catch (error) {
    console.error('Error copying audio files:', error);
    // Don't exit process if audio files fail, just log the error
    console.log('Continuing without audio files...');
  }
} else {
  console.log('No audio directory found, skipping audio files.');
} 