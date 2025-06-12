import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('accounting.db');

export const initDatabase = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS Issuer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS Transaction (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      issuer_id INTEGER,
      category_id INTEGER,
      date TEXT NOT NULL,
      invoice_image TEXT,
      amount REAL NOT NULL,
      type TEXT NOT NULL, -- 'income' or 'expense'
      concept TEXT,
      FOREIGN KEY (issuer_id) REFERENCES Issuer(id),
      FOREIGN KEY (category_id) REFERENCES Category(id)
    );`
  );
};

export default db; 