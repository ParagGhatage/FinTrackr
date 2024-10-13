// app/api/Expense/route.ts
import { NextResponse } from 'next/server';
import UserModel from '@/models/User.model';
import ExpenseModel from '@/models/Expenses.model';
import dbConnect from '@/lib/DB_connect';


// Handler function for the POST request
export async function POST(request: Request) {
    await dbConnect()

    // const rawBody = await request.text(); // Log the raw body
    // console.log('Raw body:', rawBody);

    const { email, travel, education, residential, food, entertainment,other, year, month } = await request.json();
    console.log({ email, travel, education, residential, food, entertainment, other, year, month });
    if (!email || !year || !month) {
        return NextResponse.json({ error: 'Email, year, and month are required' }, { status: 400 });
    }

    try {
        // Check if the user exists and get the user ID
        const user = await UserModel.findOne({ email });

        if (!user) {
        const user = new UserModel({
                email,
                // You can add more fields here if needed
            })
            await user.save();
        }
        
        const user1 = await UserModel.findOne({ email });
        const userId = user1._id;

        // Find the existing expense document for the current month and year
        let expenseDoc = await ExpenseModel.findOne({ userId, year, month });

        if (!expenseDoc) {
            // If no document exists for that month and year, create a new one
            expenseDoc = new ExpenseModel({
                userId,
                year,
                month,
                travel: 0,
                education: 0,
                residential: 0,
                food: 0,
                entertainment: 0,
                other:0,
            });
        }

        // Update the document with non-zero values
        if (travel > 0) expenseDoc.travel += travel;
        if (education > 0) expenseDoc.education += education;
        if (residential > 0) expenseDoc.residential += residential;
        if (food > 0) expenseDoc.food += food;
        if (entertainment > 0) expenseDoc.entertainment += entertainment;
        if (other > 0) expenseDoc.other += other;


        // Save the updated document
        await expenseDoc.save();
        return NextResponse.json({ message: 'Expense updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in Expense route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
