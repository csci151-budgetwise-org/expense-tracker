export interface ExpenseItem {
  id: string;
  category: string; // e.g., 'Food', 'Transport', 'Bills', 'Shopping'
  amount: number;
  date: string;
  description: string;
}