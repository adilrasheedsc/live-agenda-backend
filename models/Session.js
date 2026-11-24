
import mongoose from "mongoose";

import Hall from "./Hall.js";
import Track from "./Track.js";

const SessionSchema = new mongoose.Schema(
  {
    sessionName: {
      type: String,
      required: [true, "Session name is required."],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    hallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hall",
      required: [true, "Hall is required."],
      validate: {
        validator: async function (hallId) {
          if (!hallId) return false;

          const activeHall = await Hall.exists({
            _id: hallId,
            status: "Active",
          });

          return Boolean(activeHall);
        },
        message: "Selected Hall does not exist or is inactive.",
      },
    },

    trackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: [true, "Track is required."],
      validate: {
        validator: async function (trackId) {
          if (!trackId) return false;

          const activeTrack = await Track.exists({
            _id: trackId,
            status: "Active",
          });

          return Boolean(activeTrack);
        },
        message: "Selected Track does not exist or is inactive.",
      },
    },

    sessionDate: {
      type: Date,
      required: [true, "Session Date is required"],
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },

    endTime: {
      type: String,
      required: [true, "End time is required"],
    },

    chairperson: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: [true, "Chairperson is required"],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
