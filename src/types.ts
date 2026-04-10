export interface ExpenseItem {
  id: string;
  category: string; // e.g., 'Food', 'Transport', 'Bills', 'Shopping'
  amount: number;
  date: string;
  description: string;
}

export const CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'] as const;
export type Category = typeof CATEGORIES[number];