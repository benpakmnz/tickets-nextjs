import mongoose, { Schema } from "mongoose";

const tasksSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: String, required: true },
    status: { type: String, required: true },
    ticketId: { type: String, ref: "Tickets", required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Tasks = mongoose.models.Tasks || mongoose.model("Tasks", tasksSchema);

export default Tasks;
