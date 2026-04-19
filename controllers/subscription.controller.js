import Subscription from "../models/subscription.model.js";
import mongoose from "mongoose";

export const subscribe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    if (userId === channelId) {
      return res
        .status(400)
        .json({ message: "You cannot subscribe to yourself" });
    }

    const existingSubscription = await Subscription.findOne({
      subscriber: userId,
      channel: channelId,
    });

    if (existingSubscription) {
      await existingSubscription.deleteOne();

      return res.status(200).json({
        subscribed: false,
        message: "Unsubscribed successfully",
      });
    }

    await Subscription.create({ subscriber: userId, channel: channelId });

    res.status(200).json({
      subscribed: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error("Error subscribing to channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
