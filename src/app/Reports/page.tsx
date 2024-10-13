"use client";
import { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";

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
  const [email1, setEmail] = useState("");
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const [year1, setYear] = useState<number>(year);
  const [month1, setMonth] = useState<number>(month);

  async function fetchExpenses() {
    setLoading(true);
    if (!email1) {
      alert("Please enter an email!");
      return;
    } else {
      const email = email1;

      try {
        const response = await axios.get("/api/reports", {
          params: {
            email,
            year: year1,
            month: month1,
          },
          headers: {
            "Content-Type": "application/json",
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
    labels: ["Travel", "Education", "Residential", "Food", "Entertainment", "Other"],
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
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Expense Report</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your email"
            value={email1}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              value={month1}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Month (1-12)"
              onChange={(e) => setMonth(parseInt(e.target.value))}
            />
          </div>
          <div>
            <input
              type="number"
              value={year1}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Year"
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={fetchExpenses}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Get Report
          </button>
          <Link href="/add">
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300">
              Add Expenses
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-600">Loading data...</p>
        ) : error ? (
          <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 my-6">
              Total Expenses: Rs.{expenses?.totalExpense}
            </h2>
            <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
              <Pie data={chartData} className="p-4" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
