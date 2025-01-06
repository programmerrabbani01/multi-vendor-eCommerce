import mongoose from "mongoose";

// create user schema

const sellerCustomerChatSchema = mongoose.Schema(
  {
    myId: {
      type: String,
      required: true,
    },
    myFriends: {
      type: Array,
      required: [],
    },
  },
  {
    timestamps: true,
  }
);

// export user schema

export default mongoose.models.SellerCustomerChat ||
  mongoose.model("SellerCustomerChat", sellerCustomerChatSchema);
