import Tasks from "@/app/(models)/Task";
import Tickets from "@/app/(models)/Ticket";
import mongoose from "mongoose";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  console.error("MONGODB_URI is not defined in the environment variables.");
}

mongoose.Promise = global.Promise;

export const db = {
  Tasks: Tasks,
  Tickets: Tickets,
};
