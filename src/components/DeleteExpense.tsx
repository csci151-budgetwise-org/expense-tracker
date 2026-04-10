interface DeleteExpenseProps {
  expenseId: string;
  onDelete: (id: string) => void;
}

export default function DeleteExpense({ expenseId, onDelete }: DeleteExpenseProps) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      onDelete(expenseId);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      Delete
    </button>
  );
}