// app/api/reports/route.ts
import { NextResponse } from 'next/server';
import UserModel from '@/models/User.model';
import ExpenseModel from '@/models/Expenses.model';
import mongoose from 'mongoose';
import dbConnect from '@/lib/DB_connect';

// Handler function for the GET request
export async function GET(request: Request) {
    await dbConnect()
    // Extracting query parameters
    const { email,year,month } = await request.json();

    if (!email || !year || !month) {
        return NextResponse.json({ error: 'Email, year, and month are required' }, { status: 400 });
    }

    try {
        // Check if the user exists and get the user ID
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const userId = user._id;

        // Find the expense document for the current month and year
        const expenseDoc = await ExpenseModel.findOne({ userId, year, month });

        if (!expenseDoc) {
            return NextResponse.json({ message: 'No expenses found for this month' }, { status: 404 });
        }

        // Calculate total expenses
        const totalExpense =
            expenseDoc.travel + expenseDoc.education + expenseDoc.residential + expenseDoc.food + expenseDoc.entertainment;

        // Prepare the response
        const response = {
            travel: expenseDoc.travel,
            education: expenseDoc.education,
            residential: expenseDoc.residential,
            food: expenseDoc.food,
            entertainment: expenseDoc.entertainment,
            other:expenseDoc.other,
            totalExpense,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error in Reports route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
