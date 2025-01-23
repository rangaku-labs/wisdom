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

export function parseGoodWorks(fullStructure) {
  return {
    sections: fullStructure.map(collection => ({
      id: collection.id,
      title: collection.title,
      contents: collection.contents.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content
      }))
    }))
  };
}