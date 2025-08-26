import { Schema, models, model } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    // The 'date' field has been removed from here
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  { timestamps: true }
);

const Event = models.events || model("events", eventSchema);

export default Event;