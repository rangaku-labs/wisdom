import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Format the title by capitalizing words and removing extensions
function formatTitle(name) {
  return name
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}

// Generate a unique and clean ID based on the full path
function generateId(fullPath, contentDir) {
  // Get the relative path from the content directory
  const relativePath = path.relative(contentDir, fullPath);
  
  // Remove the file extension and convert to lowercase
  const pathWithoutExtension = relativePath.replace(/\.md$/, '').toLowerCase();
  
  // Replace all path separators and spaces with hyphens
  return pathWithoutExtension
    .split(path.sep).join('-')     // Convert path separators to hyphens
    .replace(/\s+/g, '-')          // Convert spaces to hyphens
    .replace(/[^a-z0-9-]/g, '');   // Remove any other special characters
}

// Process directories and Markdown files recursively
async function processDirectory(dirPath, contentDir) {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const structure = [];

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      const contents = await processDirectory(fullPath, contentDir);
      if (contents.length > 0) {
        structure.push({
          type: 'division',
          title: formatTitle(item.name),
          id: generateId(fullPath, contentDir),
          contents: contents,
        });
      }
    } else if (item.name.endsWith('.md')) {
      try {
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        structure.push({
          type: 'content',
          title: data.title || formatTitle(item.name),
          id: generateId(fullPath, contentDir),
          content: content.trim(),
          order: data.order || null,
        });
      } catch (err) {
        console.error(`Error processing file ${fullPath}:`, err);
      }
    }
  }

  return structure.sort((a, b) => {
    if (a.order !== null && b.order !== null) {
      return a.order - b.order;
    }
    if (a.order !== null) return -1;
    if (b.order !== null) return 1;
    return a.title.localeCompare(b.title);
  });
}

// Build the complete structure
async function buildStructure() {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'tianmu-canon');
    const structure = await processDirectory(contentDir, contentDir);
    
    const outputPath = path.join(process.cwd(), 'src', 'data', 'structure.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(structure, null, 2));
    
    console.log('Content structure has been successfully built and saved to structure.json');
  } catch (err) {
    console.error('Error building content structure:', err);
    process.exit(1);
  }
}

buildStructure();