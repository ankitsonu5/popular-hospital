import fs from 'fs';
import path from 'path';

const depsDir = path.join(process.cwd(), 'src', 'app', 'departments');
const deps = fs.readdirSync(depsDir).filter(f => fs.statSync(path.join(depsDir, f)).isDirectory());

console.log(`Processing ${deps.length} department directories...`);

for (const dep of deps) {
  if (dep === '[slug]') continue; // Skip dynamic route
  if (dep === 'dept') continue; // Not a standard department folder if it is an alias
  
  const dirPath = path.join(depsDir, dep);
  const pagePath = path.join(dirPath, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) continue;
  
  let pageContent = fs.readFileSync(pagePath, 'utf-8');
  
  // 1. Extract Department Name from existing title
  const titleMatch = pageContent.match(/title:\s*["']([^|]+)\s*\|\s*Popular Hospital["']/);
  let deptName = '';
  if (titleMatch) {
    deptName = titleMatch[1].replace('Department of', '').trim();
  } else {
    // Fallback based on folder name
    deptName = dep.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  
  // 2. Update Page.tsx Metadata
  const newTitle = `Best ${deptName} Hospital in Varanasi | Popular Hospital`;
  const newDesc = `Popular Hospital is the best ${deptName} hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!`;
  
  pageContent = pageContent.replace(/title:\s*["'][^"']+["']/, `title: "${newTitle}"`);
  pageContent = pageContent.replace(/description:\s*["'][^"']+["']/, `description:\n    "${newDesc}"`);
  
  // Update DepartmentSchema props if they exist
  // We need to be careful with global replace for name/description because it might replace component names.
  // We'll target `<DepartmentSchema` specifically.
  if (pageContent.includes('<DepartmentSchema')) {
    pageContent = pageContent.replace(/(<DepartmentSchema[^>]*name=["'])([^"']+)(["'])/, `$1${newTitle}$3`);
    pageContent = pageContent.replace(/(<DepartmentSchema[^>]*description=["'])([^"']+)(["'])/, `$1${newDesc}$3`);
  }
  
  fs.writeFileSync(pagePath, pageContent, 'utf-8');
  console.log(`[${dep}] Updated page.tsx`);
  
  // 3. Update Client.tsx
  const files = fs.readdirSync(dirPath);
  const clientFile = files.find(f => f.endsWith('Client.tsx'));
  
  if (clientFile) {
    const clientPath = path.join(dirPath, clientFile);
    let clientContent = fs.readFileSync(clientPath, 'utf-8');
    
    // Update H1
    clientContent = clientContent.replace(
      /(<h1[^>]*>)([\s\S]*?)(<\/h1>)/, 
      `$1\n              Department of ${deptName} — Varanasi\n            $3`
    );
    
    // Inject Intro Paragraph
    const spaceYMatch = clientContent.match(/<div className="space-y-[0-9]+[^>]*>/);
    if (spaceYMatch) {
      // Check if already injected
      if (!clientContent.includes('best ' + deptName + ' hospital in Varanasi')) {
        const injection = `\n                <p className="font-semibold text-[#0b1c43] bg-blue-50 p-4 md:p-5 rounded-xl border border-blue-100/60 mb-6 text-left shadow-sm">\n                  Popular Hospital is widely recognized as the <strong>best ${deptName} hospital in Varanasi</strong>. We are committed to delivering world-class healthcare and advanced medical facilities to patients across <strong>Purvanchal</strong> and <strong>Uttar Pradesh</strong>.\n                </p>`;
        clientContent = clientContent.replace(spaceYMatch[0], spaceYMatch[0] + injection);
      }
    }
    
    fs.writeFileSync(clientPath, clientContent, 'utf-8');
    console.log(`[${dep}] Updated ${clientFile}`);
  }
}

console.log('Update complete!');
