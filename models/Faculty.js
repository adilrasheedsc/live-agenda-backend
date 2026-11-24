
import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Faculty Name is required."],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Faculty =
  mongoose.models.Faculty ||
  mongoose.model("Faculty", FacultySchema);

export default Faculty;
