const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
