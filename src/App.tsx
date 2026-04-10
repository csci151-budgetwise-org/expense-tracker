import { useState } from 'react';
import type { ExpenseItem } from './types';

function App() {
  // const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  // const [budget, setBudget] = useState<number>(0);
  // const [filterCategory, setFilterCategory] = useState<string>('All');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
      
      {/* Pauline's BudgetSummary component goes here */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div className="col-span-1">
          {/* Pete's AddExpense component goes here */}
        </div>
        
        <div className="col-span-2">
          {/* Ervin's ExpenseList goes here. It will hold Jebron and Ken's buttons inside it. */}
        </div>
      </div>
    </div>
  );
}

export default App;