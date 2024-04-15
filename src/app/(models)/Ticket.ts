import mongoose, { Schema } from "mongoose";

const ticketsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: Number, required: true },
    status: { type: String, required: true },
    owner: { type: String, required: true },
    dueDate: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Tasks" }],
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

const Tickets =
  mongoose.models.Tickets || mongoose.model("Tickets", ticketsSchema);

export default Tickets;
