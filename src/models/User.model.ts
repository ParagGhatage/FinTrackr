// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});


const UserModel =
  (mongoose.models['Expense-User']) ||
  mongoose.model('Expense-User', userSchema);

export default UserModel;