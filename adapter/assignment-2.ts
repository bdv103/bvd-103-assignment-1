import { MongoClient, Collection } from 'mongodb';

export interface Book {
  id?: number;
  title: string;
  author?: string;
  description?: string;
  price?: number;
  image?: string;
}

const url = 'mongodb://mongo:27017';
const dbName = 'mcmasterful';
const client = new MongoClient(url);

let cachedCollection: Collection<Book> | null = null;

async function getCollection(): Promise<Collection<Book>> {
  if (cachedCollection) return cachedCollection;

  await client.connect();
  const db = client.db(dbName);
  cachedCollection = db.collection<Book>('books');

  return cachedCollection;
}

const assignment = {
  async listBooks(): Promise<Book[]> {
    const collection = await getCollection();
    return collection.find({}).toArray();
  },

  async createOrUpdateBook(book: Book): Promise<Book> {
    if (!book.title) {
      throw new Error('Book must have a title');
    }

    const collection = await getCollection();

    // Generate numeric ID if not provided
    if (!book.id) {
      const lastBook = await collection
        .find({})
        .sort({ id: -1 })
        .limit(1)
        .toArray();

      book.id = lastBook[0]?.id ? lastBook[0].id + 1 : 1;
    }

    await collection.updateOne(
      { id: book.id },
      { $set: book },
      { upsert: true }
    );

    return book;
  },

  async removeBook(id: number | string): Promise<boolean> {
    const collection = await getCollection();

    const bookId =
      typeof id === 'string' ? parseInt(id, 10) : id;

    await collection.deleteOne({ id: bookId });

    return true;
  }
};

export default assignment;
