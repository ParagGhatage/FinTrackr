// Home Page - home.js
import React from 'react';
import {Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import {Button} from "../components/ui/button"
import Link from 'next/link';

function HomePage() {
  return (
    <div className="p-8 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center text-2xl font-bold">
          Welcome to Your Finance Tracker
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>Track your expenses and manage your finances all in one place.</p>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" asChild>
              <Link href="/add">Add Expense</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/Reports">View Reports</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Take control of your finances today!
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
