import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust paths based on the current directory structure
const sourcePath = path.join(__dirname, '../../sentences');
const destPath = path.join(__dirname, '../public/sentences');

console.log('Source path:', sourcePath);
console.log('Destination path:', destPath);

// Create destination directory if it doesn't exist
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
  console.log('Created destination directory:', destPath);
}

// Check if source directory exists
if (!fs.existsSync(sourcePath)) {
  console.error('Source directory does not exist:', sourcePath);
  process.exit(1);
}

// Copy all files from sentences directory
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
  console.error('Error copying files:', error);
  process.exit(1);
} 