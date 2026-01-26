
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://mongo:27017';
const client = new MongoClient(uri);

const dbName = 'mcmasterful'; // change only if you know your database has a different name
const collectionName = 'books';

let collection = null;

async function getCollection() {
  if (!collection) {
    await client.connect();
    collection = client.db(dbName).collection(collectionName);
  }
  return collection;
}

exports.listBooks = async function() {
  const coll = await getCollection();
  const books = await coll.find({}).toArray();
  
  return books.map(b => ({
    id: b._id.toString(),
    title: b.title || '',
    author: b.author || '',
    description: b.description || '',
    price: b.price || 0,
    image: b.image || ''
  }));
};

exports.createOrUpdateBook = async function(book) {
  const coll = await getCollection();

  if (book.id) {
    const id = book.id;
    delete book.id; // don't update the _id field

    const updated = await coll.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: book },
      { returnDocument: 'after' }
    );

    if (!updated) {
      throw new Error('Book not found');
    }

    return {
      id: updated._id.toString(),
      title: updated.title,
      author: updated.author,
      description: updated.description,
      price: updated.price,
      image: updated.image
    };
  } else {
    const result = await coll.insertOne(book);
    book.id = result.insertedId.toString();
    return book;
  }
};

exports.removeBook = async function(id) {
  const coll = await getCollection();
  const result = await coll.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
};