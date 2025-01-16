import mongoose from "mongoose";

// create a color schema

const colorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    colorCode: {
      type: String,
      required: true,
      trim: true,
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

// export default color schema

export default mongoose.models.Color || mongoose.model("Color", colorSchema);
