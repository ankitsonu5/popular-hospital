import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'src', 'app');

// Utility to convert a slug to Title Case
function toTitleCase(str) {
  if (!str || str === 'app') return 'Home';
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Function to generate the metadata block string
function getMetadataString(title) {
  return `\n\nexport const metadata = {
  title: '${title}',
  description: 'Learn more about ${title} at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: '${title} | Popular Hospital Varanasi',
    description: 'Learn more about ${title} at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};\n\n`;
}

// Helper to check if file already has metadata
function hasMetadata(content) {
  return content.includes('export const metadata') || 
         content.includes('export async function generateMetadata') ||
         content.includes('export function generateMetadata');
}

// Helper to inject metadata into a server component page.tsx
function injectIntoServerPage(filePath, title, content) {
  let newContent = content;
  
  const exportDefaultIndex = newContent.indexOf('export default function');
  if (exportDefaultIndex !== -1) {
    const before = newContent.substring(0, exportDefaultIndex);
    const after = newContent.substring(exportDefaultIndex);
    newContent = before + getMetadataString(title) + after;
  } else {
    newContent += getMetadataString(title);
  }
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Injected metadata into Server Page: ${filePath}`);
}

// Helper to create or update layout.tsx for client components
function handleClientPageLayout(dirPath, title) {
  const layoutPath = path.join(dirPath, 'layout.tsx');
  
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    if (!hasMetadata(layoutContent)) {
      const exportDefaultIndex = layoutContent.indexOf('export default function');
      let newLayoutContent = layoutContent;
      if (exportDefaultIndex !== -1) {
        newLayoutContent = layoutContent.substring(0, exportDefaultIndex) + getMetadataString(title) + layoutContent.substring(exportDefaultIndex);
      } else {
        newLayoutContent += getMetadataString(title);
      }
      fs.writeFileSync(layoutPath, newLayoutContent, 'utf8');
      console.log(`✅ Updated existing Layout: ${layoutPath}`);
    } else {
      console.log(`⏭️  Layout already has metadata: ${layoutPath}`);
    }
  } else {
    // Create new layout.tsx
    const layoutContent = `export const metadata = {
  title: '${title}',
  description: 'Learn more about ${title} at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: '${title} | Popular Hospital Varanasi',
    description: 'Learn more about ${title} at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
    fs.writeFileSync(layoutPath, layoutContent, 'utf8');
    console.log(`✅ Created new Layout: ${layoutPath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Skip if page already has metadata
      if (hasMetadata(content)) {
        console.log(`⏭️  Skipping (already has metadata): ${fullPath}`);
        continue;
      }
      
      // Determine the title from the folder name
      const folderName = path.basename(dir);
      let title = toTitleCase(folderName);
      
      // Handle dynamic routes like [slug]
      if (title.startsWith('[') && title.endsWith(']')) {
         title = 'Details'; 
      }
      
      const isClientComponent = content.includes('"use client"') || content.includes("'use client'");
      
      if (isClientComponent) {
        console.log(`⚠️ Client Component found. Handling via layout: ${fullPath}`);
        handleClientPageLayout(dir, title);
      } else {
        injectIntoServerPage(fullPath, title, content);
      }
    }
  }
}

// Start processing from src/app
console.log('🚀 Starting metadata injection script...');
processDirectory(APP_DIR);
console.log('🎉 Done!');
