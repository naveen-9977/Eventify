import { Schema, models, model } from "mongoose";

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
    userPhone: {
        type: String,
        required: [true, "User phone is required"],
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    // Updated status to include 'Rejected'
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected"],
      default: "Pending",
    },
    // New fields for payment details
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const Booking = models.bookings || model("bookings", bookingSchema);

export default Booking;