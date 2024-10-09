// Input Page - input.tsx
'use client'
import React, { useState } from 'react';
import { Input, } from "@/components/ui/input";
import {  Button } from "@/components/ui/button";
import {  Label } from "@/components/ui/label";

// Define the specific categories as a type
type ExpenseCategory = 'Rent' | 'Food' | 'Travel' | 'Subscriptions';

// Create an interface for the expenses object
interface Expenses {
  Rent: string;
  Food: string;
  Travel: string;
  Subscriptions: string;
}

function InputPage() {
  const [expenses, setExpenses] = useState<Expenses>({
    Rent: '',
    Food: '',
    Travel: '',
    Subscriptions: '',
  });

  const handleChange = (category: ExpenseCategory, value: string) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: value,
    }));
  };

  const handleAddExpense = async (category: ExpenseCategory) => {
    const amount = expenses[category];
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    try {
      // Mocking an API request
      await fetch('/api/add-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category }),
      });
      alert(`${category} expense added successfully!`);
      setExpenses((prevExpenses) => ({
        ...prevExpenses,
        [category]: '',
      }));
    } catch (error) {
      console.error(`Failed to add ${category} expense:`, error);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {Object.keys(expenses).map((category) => (
        <div key={category} className="space-y-2">
          <Label htmlFor={category}>{category}:</Label>
          <Input
            id={category}
            type="number"
            placeholder={`Enter ${category} amount`}
            value={expenses[category as ExpenseCategory]} // Type assertion here
            onChange={(e) => handleChange(category as ExpenseCategory, e.target.value)}
          />
          <Button onClick={() => handleAddExpense(category as ExpenseCategory)}>
            Add {category} Expense
          </Button>
        </div>
      ))}
    </div>
  );
}

export default InputPage;
