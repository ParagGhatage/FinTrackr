"use client"
import {useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';
// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);


interface ExpenseData {
    travel: number;
    education: number;
    residential: number;
    food: number;
    entertainment: number;
    other: number;
    totalExpense: number;
}

const ReportsPage = () => {
    const [expenses, setExpenses] = useState<ExpenseData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [email1,setEmail] = useState("")
    const year = new Date().getFullYear(); // Use the current year or any year
    const month = new Date().getMonth() + 1;
    
    const [year1,setYear] = useState<number>(year)
    const [month1,setMonth] = useState<number>(month)



      async function fetchExpenses() {
          setLoading(true);
          if(!email1){
            alert("Please enter an email!")
          }
            
          else{const email = email1; // Replace with dynamic value
            const year = new Date().getFullYear(); // Use the current year or any year
            const month = new Date().getMonth() + 1; // Month is 0-indexed in JavaScript
            try {
              const response = await axios.get('/api/reports', {
                  params: { // Correctly pass the parameters here
                      email,
                      year,
                      month,
                  },
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              
              const data: ExpenseData = response.data;
              setExpenses(data);
          } catch (error) {
              console.error("Error fetching expenses:", error);
              setError("Failed to load expenses. Please try again later.");
          } finally {
              setLoading(false);
          }  
          }
            
      }

    

    // Prepare data for Pie chart
    const chartData = {
        labels: [
            'Travel',
            'Education',
            'Residential',
            'Food',
            'Entertainment',
            'Other',
        ],
        datasets: [
            {
                data: [
                    expenses?.travel || 0,
                    expenses?.education || 0,
                    expenses?.residential || 0,
                    expenses?.food || 0,
                    expenses?.entertainment || 0,
                    expenses?.other || 0,
                ],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    return (
        <div className="container mx-auto p-4 w-45">
          <div>
            <input type="text"
            placeholder='please enter your email'
            typeof='email'
            value={email1}
            className='p-4 border border-black rounded-md'
          onChange={(e) => setEmail(e.target.value)
            

          }
            />
            <input 
            type='number'
            value={month1}
            className='p-4 border border-black rounded-md'
          onChange={(e) => setMonth(parseInt(e.target.value))
            

          }
            />
            <input type="number"
            
            value={year1}
            className='p-4 border border-black rounded-md'
          onChange={(e) => setYear(parseInt(e.target.value))
            

          }
            />
            <button
            onClick={fetchExpenses}
            className='bg-slate-700 p-4 m-2 text-white rounded-md'>Get Report</button>
            <Link href={"/add"}>
            <button
            className='bg-blue-500 text-gray-300 p-4 rounded-md m-2'>
              Add Expenses
            </button>
            </Link>

          </div>
            <h1 className="text-2xl font-bold text-center">Expense Report</h1>
            {loading ? (
                <p className="text-center">Loading data...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <>
                        <h2 className="text-xl font-semibold">Total Expenses: Rs.{expenses?.totalExpense}</h2>

                    <Pie data={chartData} className='p-20'/>
                    <div className="text-center mt-4">
                    </div>
                </>
            )}
        </div>
    );
};

export default ReportsPage;
