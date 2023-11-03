import { Document, Schema, model } from 'mongoose';

export enum Role {
  HOTELIER = 'HOTELIER',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserType {
  name: string;
  email: string;
  password: string;
  balance?: number;
  verify?: boolean;
  avartar?: string;
  role?: Role;
  isActive?: boolean;
}
export interface UserDocument extends UserType, Document {
  createdAt:Date;
  updatedAt:Date;
}

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
      required: true,
    },
    avartar: {
      type: String,
    },
    role: {
      type: String,
      default: Role.USER,
      enum: Object.values(Role),
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true },
);
const User = model<UserType>('Users', userSchema);

export default User;
