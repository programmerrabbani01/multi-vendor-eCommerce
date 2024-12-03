import mongoose from "mongoose";

// create user schema

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Undefined"],
      default: "Undefined",
    },
    photo: {
      type: String,
      default: null,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      // required: true,
      // enum: ["Admin", "User", "Author"],
    },
    active: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export user schema

export default mongoose.models.User || mongoose.model("User", userSchema);
