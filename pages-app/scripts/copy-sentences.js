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

// Function to check if files are different
function filesAreDifferent(sourceFile, destFile) {
  // If destination file doesn't exist, they're different
  if (!fs.existsSync(destFile)) {
    return true;
  }
  
  try {
    // Compare file sizes first (quick check)
    const sourceStats = fs.statSync(sourceFile);
    const destStats = fs.statSync(destFile);
    
    if (sourceStats.size !== destStats.size) {
      return true;
    }
    
    // Compare modification times
    if (sourceStats.mtime > destStats.mtime) {
      return true;
    }
    
    // For small files, we could do a content comparison, but
    // for simplicity and performance, we'll just use size and mtime
    return false;
  } catch (error) {
    console.error(`Error comparing files ${sourceFile} and ${destFile}:`, error);
    // If there's an error, assume they're different to be safe
    return true;
  }
}

// Copy all markdown files from sentences directory
try {
  const files = fs.readdirSync(sourcePath);
  console.log('Found files in source directory:', files);
  
  let copiedCount = 0;
  let skippedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const sourceFile = path.join(sourcePath, file);
      const destFile = path.join(destPath, file);
      
      if (filesAreDifferent(sourceFile, destFile)) {
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Copied ${file} to public/sentences/`);
        copiedCount++;
      } else {
        console.log(`Skipped ${file} (unchanged)`);
        skippedCount++;
      }
    }
  });
  
  console.log(`Sentence files: ${copiedCount} copied, ${skippedCount} skipped (unchanged)`);
} catch (error) {
  console.error('Error copying markdown files:', error);
  process.exit(1);
}

// Copy all audio files from sentences/audio directory if it exists
if (fs.existsSync(sourceAudioPath)) {
  try {
    const audioFiles = fs.readdirSync(sourceAudioPath);
    console.log('Found audio files in source directory:', audioFiles.length);
    
    let copiedCount = 0;
    let skippedCount = 0;
    
    audioFiles.forEach(file => {
      if (file.endsWith('.mp3')) {
        const sourceFile = path.join(sourceAudioPath, file);
        const destFile = path.join(destAudioPath, file);
        
        if (filesAreDifferent(sourceFile, destFile)) {
          fs.copyFileSync(sourceFile, destFile);
          console.log(`Copied audio file ${file} to public/sentences/audio/`);
          copiedCount++;
        } else {
          // Don't log each skipped file to avoid console spam
          skippedCount++;
        }
      }
    });
    
    console.log(`Audio files: ${copiedCount} copied, ${skippedCount} skipped (unchanged)`);
  } catch (error) {
    console.error('Error copying audio files:', error);
    // Don't exit process if audio files fail, just log the error
    console.log('Continuing without audio files...');
  }
} else {
  console.log('No audio directory found, skipping audio files.');
} 