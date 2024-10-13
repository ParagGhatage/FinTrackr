// Home Page - home.js
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Link from 'next/link';

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container max-w-md mx-auto p-6">
        <Card className="shadow-2xl transform transition-transform hover:scale-105 hover:shadow-lg duration-300 rounded-lg bg-white">
          <CardHeader className="bg-indigo-500 text-white py-6 rounded-t-lg">
            <h1 className="text-center text-3xl font-extrabold tracking-tight">Welcome to Your Finance Tracker</h1>
          </CardHeader>
          <CardContent className="p-8 space-y-6 text-center">
            <p className="text-lg font-medium text-gray-700">Track your expenses and manage your finances all in one place.</p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white" asChild>
                <Link href="/add">Add Expense</Link>
              </Button>
              <Button variant="outline" className="border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white" asChild>
                <Link href="/Reports">View Reports</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 py-4 rounded-b-lg text-center text-sm text-gray-600">
            Take control of your finances today!
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
