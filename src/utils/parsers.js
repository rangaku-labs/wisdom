import structure from '../data/structure.json'

export function parseTianmuOnly(fullStructure) {
  const tianmuContents = fullStructure.map(book => ({
    id: book.id,
    title: book.title,
    chapters: book.contents.flatMap(part => 
      part.contents.map(chapter => ({
        id: chapter.id,
        title: chapter.title,
        content: chapter.content
      }))
    )
  }));

  return {
    sections: tianmuContents
  };
}