import { Collection, MongoClient } from 'mongodb'; 

export type BookID = string;

export interface Book {
    id?: BookID,
    name: string,
    author: string,
    description: string,
    price: number,
    image: string,
};

// Database connection setup
const url = 'mongodb://mongo:27017'; 
const client = new MongoClient(url);
const dbName = 'mcmasterful'; 

async function getCollection(): Promise<Collection<Book>> {
    await client.connect(); 
    const db = client.db(dbName);
    return db.collection<Book>('books'); 
}

// 1. List Function: Fetches all books from the database
async function listBooks(filters?: Array<{from?: number, to?: number}>) : Promise<Book[]>{
    const collection = await getCollection();
    
    // find({}) retrieves everything; toArray() converts it for the frontend
    const books = await collection.find({}).toArray(); 
    
    return books;
}

// 2. Create & Update Function: add new books & edit old ones
async function createOrUpdateBook(book: Book): Promise<BookID> {
    const collection = await getCollection();
    
    const filter = { name: book.name }; 
    
    await collection.updateOne(
        filter, 
        { $set: book }, 
        { upsert: true } //update if true (found), create if not
    );
    
    return book.name; 
}

// 3. Remove Function: deletes a book based on its ID (name)
async function removeBook(bookId: BookID): Promise<void> {
    const collection = await getCollection();
    
    // Delete the document where the name matches the ID
    await collection.deleteOne({ name: bookId });
}

const assignment = "assignment-2";

export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks
};