import mongoose from 'mongoose';

export interface IFriend {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  dateOfBirth: Date;
  phone?: string;
  address?: string;
  bestFriend?: boolean;
  friendsSince?: Date;
  note?: string;
}

const FriendSchema = new mongoose.Schema<IFriend>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String },
    address: { type: String },
    bestFriend: { type: Boolean },
    friendsSince: { type: Date },
    note: { type: String },
  },
  {
    timestamps: true,
  },
);

// const Friend = mongoose.model<IFriend>("Friend", FriendSchema);
const Friend =
  mongoose.models.Friend || mongoose.model<IFriend>('Friend', FriendSchema);

export default Friend;
