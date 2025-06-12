export interface Issuer {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Transaction {
  id: number;
  issuer_id: number;
  category_id: number;
  date: string; // ISO string
  invoice_image: string;
  amount: number;
  type: 'income' | 'expense' | 'cost';
  concept: string;
} 