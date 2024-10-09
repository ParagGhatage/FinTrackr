import { NextResponse } from 'next/server';
import UserModel from '@/models/User.model'; // Adjust the path as necessary
import mongoose from 'mongoose';
import dbConnect from '@/lib/DB_connect';



// Handler function for the POST request
export async function POST(request: Request) {
    await dbConnect()

    const { email } = await request.json(); // Get email from the request body

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        // Check if the user with that email already exists
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            // User exists
            return NextResponse.json({ message: 'User already exists' }, { status: 200 });
        } else {
            // Create a new user
            const newUser = new UserModel({
                email,
                // You can add more fields here if needed
            });

            await newUser.save(); // Save the new user to the database
            return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
        }
    } catch (error) {
        console.error('Error in User route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
