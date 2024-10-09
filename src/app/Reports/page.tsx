// Reports Page - reports.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type ExpenseData = {
  category: string;
  amount: number;
};

function ReportsPage() {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch('/api/get-expenses');
        const data: ExpenseData[] = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
    fetchExpenses();
  }, []);

  const chartData: ChartData<'pie', number[], string> = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: 'Expenses by Category',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Expense Breakdown</h2>
      <div className="max-w-md mx-auto">
        {expenses.length > 0 ? (
          <Pie data={chartData} />
        ) : (
          <p className="text-center">Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;

