import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

subscriptionSchema.index({ subscriber: 1, channel: 1 }, { unique: true });

subscriptionSchema.index({ channel: 1 });
subscriptionSchema.index({ subscriber: 1 });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
