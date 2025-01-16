import mongoose from "mongoose";

// create product schema

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required."],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      min: [0, "Price cannot be negative."],
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Price cannot be negative."],
      default: 0,
    },
    discount: {
      type: Number,
      trim: true,
      min: [0, "Discount cannot be negative."],
      max: [100, "Discount cannot exceed 100%."],
      default: 0,
    },
    // brand: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "Brand",
    // },
    // category: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "Category",
    // },
    // sizes: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "Size",
    // },
    // colors: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "Color",
    // },
    brand: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
    sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Size" }],
    photos: [{ public_id: String, url: String }],
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// export product schema

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
