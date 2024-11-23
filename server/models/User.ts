import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  nom?: string;
  prenom?: string;
  phoneNumber?: number;
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (v: number) {
        return /^\d{8}$/.test(v.toString());
      },
      message: (props) => `${props.value} is not a valid 8-digit phone number!`,
    },
  },
});

// Hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;