import mongoose from "mongoose";

interface IFriend {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  birthday: Date;
  email: string;
  phone: string;
  address: string;
  bestFriend: boolean;
  friendsSince: Date;
  note: string;
}

const FriendSchema = new mongoose.Schema<IFriend>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    bestFriend: { type: Boolean, required: true },
    friendsSince: { type: Date, required: true },
    note: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// const Friend = mongoose.model<IFriend>("Friend", FriendSchema);
const Friend =
  mongoose.models.Friend || mongoose.model<IFriend>("Friend", FriendSchema);

export default Friend;
