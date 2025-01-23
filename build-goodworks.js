import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

function formatTitle(name) {
  return name
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}

function generateId(fullPath, contentDir) {
  const relativePath = path.relative(contentDir, fullPath);
  const pathWithoutExtension = relativePath.replace(/\.md$/, '').toLowerCase();
  
  return pathWithoutExtension
    .split(path.sep).join('-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function processDirectory(dirPath, contentDir) {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const structure = [];

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      const contents = await processDirectory(fullPath, contentDir);
      if (contents.length > 0) {
        structure.push({
          type: 'collection',
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
          tradition: data.tradition || null,
          category: data.category || null,
        });
      } catch (err) {
        console.error(`Error processing file ${fullPath}:`, err);
      }
    }
  }

  return structure.sort((a, b) => a.title.localeCompare(b.title));
}

async function buildGoodWorksStructure() {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'good-works');
    
    // Create directory if it doesn't exist
    try {
      await fs.mkdir(contentDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }

    const structure = await processDirectory(contentDir, contentDir);
    
    const outputPath = path.join(process.cwd(), 'src', 'data', 'goodworks-structure.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(structure, null, 2));
    
    console.log('Good Works content structure has been successfully built and saved to goodworks-structure.json');
  } catch (err) {
    console.error('Error building Good Works content structure:', err);
    // Create empty structure if there's an error
    const outputPath = path.join(process.cwd(), 'src', 'data', 'goodworks-structure.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify([], null, 2));
    console.log('Created empty Good Works structure due to error');
  }
}

buildGoodWorksStructure();