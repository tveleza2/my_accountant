import { openDatabase } from 'expo-sqlite';
import { Issuer, Category, Transaction } from '../types/models';

const db = openDatabase('accounting.db');

export const initDatabase = async () => {
  await db.execAsync(
    [
      { sql: `CREATE TABLE IF NOT EXISTS Issuer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );`, args: [] },
      { sql: `CREATE TABLE IF NOT EXISTS Category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );`, args: [] },
      { sql: `CREATE TABLE IF NOT EXISTS Transaction (
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
      );`, args: [] }
    ],
    true
  );
};

// Issuer CRUD
export const getIssuers = (): Promise<Issuer[]> =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Issuer',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });

export const createIssuer = (name: string): Promise<Issuer> =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Issuer (name) VALUES (?)',
        [name],
        (_, result) => resolve({ id: result.insertId ?? 0, name }),
        (_, error) => { reject(error); return false; }
      );
    });
  });

// Category CRUD
export const getCategories = (): Promise<Category[]> =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Category',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });

export const createCategory = (name: string, description: string): Promise<Category> =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Category (name, description) VALUES (?, ?)',
        [name, description],
        (_, result) => resolve({ id: result.insertId ?? 0, name, description }),
        (_, error) => { reject(error); return false; }
      );
    });
  });

// Transaction CRUD
export const getTransactions = (): Promise<Transaction[]> =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Transaction',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });

export const createTransaction = (tx: Omit<Transaction, 'id'>): Promise<Transaction> =>
  new Promise((resolve, reject) => {
    db.transaction(tr => {
      tr.executeSql(
        'INSERT INTO Transaction (issuer_id, category_id, date, invoice_image, amount, type, concept) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tx.issuer_id ?? 0, tx.category_id ?? 0, tx.date, tx.invoice_image, tx.amount, tx.type, tx.concept],
        (_, result) => resolve({ ...tx, id: result.insertId ?? 0 }),
        (_, error) => { reject(error); return false; }
      );
    });
  });

export default db; 