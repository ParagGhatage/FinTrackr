// models/expense.js
import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense-User', required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    travel: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    residential: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    other:{ type: Number, default: 0 },
    entertainment: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
   
});



const ExpenseModel =
  (mongoose.models['Expense']) ||
  mongoose.model('Expense', expenseSchema);

export default ExpenseModel;