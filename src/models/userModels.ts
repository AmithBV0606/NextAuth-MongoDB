import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password."],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Since Next.js runs on Edge environment :
const User =
  mongoose.models.user || new mongoose.Model("users", userSchema);
export default User;
