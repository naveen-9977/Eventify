import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    // Changed 'name' to 'mobileNumber'
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true, // Ensure mobile numbers are unique
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const User = models.users || model("users", userSchema);

export default User;