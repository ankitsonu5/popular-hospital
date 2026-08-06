import fs from 'fs';
import path from 'path';

const depsDir = path.join(process.cwd(), 'src', 'app', 'departments');
const deps = fs.readdirSync(depsDir).filter(f => fs.statSync(path.join(depsDir, f)).isDirectory());

let fixedCount = 0;

for (const dep of deps) {
  if (dep === '[slug]') continue;
  if (dep === 'dept') continue;
  
  const pagePath = path.join(depsDir, dep, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  
  let content = fs.readFileSync(pagePath, 'utf-8');
  
  // This regex matches the "description: ... " up to the next comma OR alternatives:
  // It specifically looks for the garbage trailing text after the injected string
  const brokenRegex = /(description:\s*["']Popular Hospital is the best[^!]+!["'])([^,]*),(\s*alternates:)/;
  
  if (brokenRegex.test(content)) {
    content = content.replace(brokenRegex, '$1,$3');
    fs.writeFileSync(pagePath, content, 'utf-8');
    fixedCount++;
    console.log(`[${dep}] Fixed syntax error in description`);
  }
}

console.log(`Fixed ${fixedCount} files.`);
