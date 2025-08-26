import { Schema, models, model } from "mongoose";
const userSchema = new Schema(
  {
    mainTitle: {
      type: String,
      required: [true, "Primary Title is required"],
    },
    para1: {
      type: String,
      required: [true, "paragraph1 is required"],
    },
    para2: {
      type: String,
      required: [true, "paragraph2 is required"],
    },
    secondaryTitle: {
      type: String,
      required: [true, "Secondary Title is required"],
    },
    para3: {
      type: String,
      required: [true, "paragraph3 is required"],
    },
    para4: {
      type: String,
      required: [true, "paragraph4 is required"],
    },
    thirdTitle: {
      type: String,
      required: [true, "third Title is required"],
    },
    para5: {
      type: String,
      required: [true, "paragraph5 is required"],
    },
    para6: {
      type: String,
      required: [true, "paragraph6 is required"],
    },
    fourthTitle: {
      type: String,
      required: [true, "fourth Title is required"],
    },
    para7: {
      type: String,
      required: [true, "paragraph7 is required"],
    },
    para8: {
      type: String,
      required: [true, "paragraph8 is required"],
    },
  },
  { timestamps: true }
);

const Services = models.services || model("services", userSchema);

export default Services;
