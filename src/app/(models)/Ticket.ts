import { ITicketAttrs } from "@/types";
import mongoose, { Model, Schema, Document } from "mongoose";

interface ITaskId extends Schema.Types.ObjectId {}

interface ITicketModel extends Model<ITicketDocument> {
  build(attrs: ITicketAttrs): ITicketDocument;
}

export interface ITicketDocument extends Document {
  title: string;
  description: string;
  category: string;
  priority: number;
  status: string;
  owner: string;
  dueDate: string;
  tasks: ITaskId[];
}

const ticketsSchema = new Schema<ITicketDocument>(
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
  mongoose.models.Tickets ||
  mongoose.model<ITicketDocument, ITicketModel>("Tickets", ticketsSchema);

export default Tickets;
