import { ITaskAttrs } from "@/types";
import mongoose, { Model, Schema, Document } from "mongoose";

interface ITaskModel extends Model<ITaskDocument> {
  build(attrs: ITaskAttrs): ITaskDocument;
}

export interface ITaskDocument extends Document {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: string;
  ticketId: Schema.Types.ObjectId;
}

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

const Tasks =
  mongoose.models.Tasks ||
  mongoose.model<ITaskDocument, ITaskModel>("Tasks", tasksSchema);

export default Tasks;
