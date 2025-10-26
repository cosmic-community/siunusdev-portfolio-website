import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if script is already injected
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already present in ${path.basename(filePath)}`);
    return;
  }
  
  // Inject before closing head tag
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n  </head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Injected script into ${path.basename(filePath)}`);
  } else {
    console.log(`✗ No </head> tag found in ${path.basename(filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('🔧 Injecting console capture script...\n');

if (fs.existsSync(distDir)) {
  walkDir(distDir);
  console.log('\n✅ Console capture script injection complete!');
} else {
  console.error('❌ dist directory not found. Please run build first.');
  process.exit(1);
}