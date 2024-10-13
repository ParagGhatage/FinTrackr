'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import Link from 'next/link';

// Define the specific categories as a type
type ExpenseCategory = 'Travel' | 'Food' | 'Education' | 'Residential' | 'Other' | 'Entertainment';

// Create an interface for the expenses object
interface Expenses {
  Travel: number;
  Education: number;
  Residential: number;
  Food: number;
  Other: number;
  Entertainment: number;
}

function InputPage() {
  const [email, setEmail] = useState<string>('');
  const [expenses, setExpenses] = useState<Expenses>({
    Travel: 0,
    Education: 0,
    Residential: 0,
    Food: 0,
    Other: 0,
    Entertainment: 0,
  });
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1); // Months are zero-based

  const handleChange = (category: ExpenseCategory, value: number) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: (value) , // Convert to number or set to 0
    }));
  };

  const handleAddExpense = async () => {
    const { Travel, Education, Residential, Food, Other, Entertainment } = expenses;

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      // Mocking an API request
       const res= await axios.post('/api/expense',{
        email,
        travel: Travel,
        education: Education,
        residential: Residential,
        food: Food,
        entertainment: Entertainment,
        other: Other,
        year,
        month,
      }, 
       
        {headers: { 'Content-Type': 'application/json' }},
  
      );

      console.log(res)

      alert("Expenses added successfully!");
      setExpenses({
        Travel: 0,
        Education: 0,
        Residential: 0,
        Food: 0,
        Other: 0,
        Entertainment: 0,
      });
      setEmail(''); // Reset the email input
    } catch (error) {
      console.error("Failed to add expenses:", error);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <Link href={"/Reports"}>
            <button
            className='bg-blue-500 text-white p-4 rounded-md m-2'>
              View reports
            </button>
            </Link>
            <Button onClick={handleAddExpense} className='p-4'>
        Add Expenses
      </Button>
      <div className="space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {Object.keys(expenses).map((category) => (
        <div key={category} className="space-y-2">
          <Label htmlFor={category}>{category}:</Label>
          <Input
            id={category}
            type="number"
            placeholder={`Enter ${category} amount`}
            value={expenses[category as ExpenseCategory]} // Type assertion here
            onChange={(e) => handleChange(category as ExpenseCategory, parseInt(e.target.value))}
          />
        </div>
      ))}
      <div className="space-y-2">
        <Label htmlFor="year">Year:</Label>
        <Input
          id="year"
          type="number"
          placeholder="Enter year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="month">Month:</Label>
        <Input
          id="month"
          type="number"
          placeholder="Enter month (1-12)"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        />
      </div>
      
    </div>
  );
}

export default InputPage;
