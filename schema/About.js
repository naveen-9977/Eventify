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
  },
  { timestamps: true }
);

const About = models.about || model("about", userSchema);

export default About;
