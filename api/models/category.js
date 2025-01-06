import mongoose from "mongoose";

// create category schema

const categorySchema = mongoose.Schema(
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
      unique: true,
    },
    photo: {
      type: String,
      default: null,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Category",
    },
    subCategory: {
      type: [mongoose.Schema.Types.ObjectId],
      default: null,
      ref: "Category",
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// export

export default mongoose.model("Category", categorySchema);
