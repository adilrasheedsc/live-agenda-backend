
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: [true, "Session is required."],
    },

    topicName: {
      type: String,
      required: [true, "Topic name is required."],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    startTime: {  // like 10:30 AM
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {   // like 11:00 AM
      type: String,
      required: [true, "End time is required"],
    },

    topicType: {
      type: String,
      enum: ["Talk", "Debate", "Panel Discussion"],
      default: "Talk",
      required: [true, "Topic type is required."],
    },

    facultyId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Faculty is required"],
    }],

    moderatorId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Moderator is required"],
    }],

    panelistId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Panelist is required"],
    }],

    expertPanelistId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Expert panelist is required"],
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Topic =
  mongoose.models.Topic ||
  mongoose.model("Topic", TopicSchema);

export default Topic;
