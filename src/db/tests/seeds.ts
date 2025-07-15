import { faker } from '@faker-js/faker'

export const generateSeedDocument = (author_id: string) => {
  return {
    author_id,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    is_published: faker.datatype.boolean(),
  }
}

export const generateSeedDocumentBlocks = (documentId: string) => {
  return Array.from({ length: 10 }, () => ({
    document_id: documentId,
    position: faker.number.int({ min: 1, max: 100 }),
    type: faker.helpers.arrayElement([
      'paragraph',
      'heading1',
      'heading2',
      'heading3',
      'quote',
      'list-item',
      'youtube',
      'vimeo',
      'image',
      'audio',
    ]),
    content: faker.lorem.paragraph(),
    url: faker.internet.url(),
    title: faker.lorem.sentence(),
  }))
}
