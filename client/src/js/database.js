import { openDB } from 'idb';

// Initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to save content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  // Open the database
  const jateDb = await openDB('jate', 1);
  
  // Start a new transaction and get the object store
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  // Put the content in the store, using id 1 to always overwrite the previous entry
  const request = store.put({ id: 1, content });
  
  // Wait for the request to complete
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method to get content from the database
export const getDb = async () => {
  console.log('GET from the database');
  
  // Open the database
  const jateDb = await openDB('jate', 1);
  
  // Start a new transaction and get the object store
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  // Get the content with id 1
  const request = store.get(1);
  
  // Wait for the request to complete
  const result = await request;
  console.log('🚀 - data retrieved from the database', result?.content);
  return result?.content;
};

// Initialize the database
initdb();
