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

export const getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    // TODO: Optimize by using aggregation to get both isSubscribed and subscribersCount in one query

    const subscribersCount = await Subscription.countDocuments({
      channel: channelId,
    });

    let isSubscribed = false;

    if (userId) {
      const existing = await Subscription.findOne({
        subscriber: userId,
        channel: channelId,
      });

      isSubscribed = !!existing;
    }

    res.status(200).json({
      isSubscribed,
      subscribersCount,
    });
  } catch (error) {
    console.error("Get subscription status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

