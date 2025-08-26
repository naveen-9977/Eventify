import { Schema, models, model } from "mongoose";
const userSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "image URL is required"],
    },
    para1: {
      type: String,
      required: [true, "para1 Title is required"],
    },
    para2: {
      type: String,
      required: [true, "paragraph3 is required"],
    },
    para3: {
      type: String,
      required: [true, "paragraph3 is required"],
    },
  },
  { timestamps: true }
);

const Blogs = models.blogs || model("blogs", userSchema);

export default Blogs;
