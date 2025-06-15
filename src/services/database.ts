import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Issuer, Category, Transaction } from '../types/models';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (dbName: string): Promise<void> => {
  try {
    // Ensure the SQLite directory exists
    const sqliteDir = `${FileSystem.documentDirectory}SQLite`;
    const dirInfo = await FileSystem.getInfoAsync(sqliteDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });
      console.log('Created SQLite directory');
    } else {
      console.log('SQLite directory already exists');
    }

    

    // Open the database using the standard API
    db = SQLite.openDatabase(dbName);
    console.log('Database opened with name: ', dbName);

    // Enable WAL mode before any transactions
    await new Promise<void>((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not initialized'));
        return;
      }
      db.exec([{ sql: 'PRAGMA journal_mode = WAL', args: [] }], false, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    // Create tables
    await new Promise<void>((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not initialized'));
        return;
      }
      db.transaction(tx => {
        tx.executeSql('PRAGMA foreign_keys = ON');
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS issuer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
          );`);
          
        tx.executeSql(`CREATE TABLE IF NOT EXISTS category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
          );`);

          
        tx.executeSql(`CREATE TABLE IF NOT EXISTS expense (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            issuer_id INTEGER,
            category_id INTEGER,
            date TEXT NOT NULL,
            invoice_image TEXT,
            amount REAL NOT NULL,
            type TEXT NOT NULL,
            concept TEXT,
            FOREIGN KEY (issuer_id) REFERENCES issuer (id),
            FOREIGN KEY (category_id) REFERENCES category (id)
          );
        `);
      }, reject, resolve);
    });
    
    console.log('All tables created successfully');

    // List tables
    const tables = await new Promise<Array<{ name: string }>>((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not initialized'));
        return;
      }
      db.transaction(tx => {
        tx.executeSql(
          'SELECT name FROM sqlite_master WHERE type="table"',
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
    console.log('Tables in DB:', tables);
    
  } catch (e: unknown) {
    console.error('Database initialization failed:', e);
    throw e;
  }
};

// Issuer CRUD
export const getIssuers = async (): Promise<Issuer[]> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  const database = db;
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM issuer',
        [],
        (_, result) => resolve(result.rows._array as Issuer[]),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const createIssuer = async (name: string): Promise<Issuer> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  const database = db;
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO issuer (name) VALUES (?)',
        [name],
        (_, result) => resolve({ id: result.insertId as number, name }),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Category CRUD
export const getCategories = async (): Promise<Category[]> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  const database = db;
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM category',
        [],
        (_, result) => resolve(result.rows._array as Category[]),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const createCategory = async (name: string, description: string): Promise<Category> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  const database = db;
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO category (name, description) VALUES (?, ?)',
        [name, description],
        (_, result) => resolve({ id: result.insertId as number, name, description }),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Transaction CRUD
export const getTransactions = async (): Promise<Transaction[]> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  const database = db;
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM expense',
        [],
        (_, result) => resolve(result.rows._array as Transaction[]),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const createExpense = async (tx: Omit<Transaction, 'id'>): Promise<Transaction> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  const database = db;
  return new Promise((resolve, reject) => {
    database.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO expense (issuer_id, category_id, date, invoice_image, amount, type, concept) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tx.issuer_id ?? 0, tx.category_id ?? 0, tx.date, tx.invoice_image, tx.amount, tx.type, tx.concept],
        (_, result) => resolve({ ...tx, id: result.insertId as number }),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteDb = async (dbPath: string): Promise<void> => {
  try {
    if (db) {
      await new Promise<void>((resolve) => {
        db?.close();
        resolve();
      });
    }
    await FileSystem.deleteAsync(dbPath, { idempotent: true });
    console.log('Database deleted');
  } catch (error: unknown) {
    console.error('Error deleting database:', error);
    throw error;
  }
};

// Helper function to get database instance
export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

export default db;