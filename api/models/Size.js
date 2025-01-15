import mongoose from "mongoose";

// create a tag schema

const sizeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// export default tag schema

export default mongoose.models.size || mongoose.model("Size", sizeSchema);
