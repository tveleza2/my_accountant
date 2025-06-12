import { Issuer, Category, Transaction } from '../types/models';

const API_URL = 'http://localhost:8080'; // Change to your backend address if needed

// Issuer
export const fetchIssuers = async (): Promise<Issuer[]> => {
  const res = await fetch(`${API_URL}/issuers`);
  return res.json();
};

export const createIssuer = async (issuer: Omit<Issuer, 'id'>): Promise<Issuer> => {
  const res = await fetch(`${API_URL}/issuers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issuer),
  });
  return res.json();
};

// Category
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  return res.json();
};

// Transaction
export const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${API_URL}/transactions`);
  return res.json();
};

export const createTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  const res = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return res.json();
}; 