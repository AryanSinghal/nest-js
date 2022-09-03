import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String,
  password: String,
  dob: Date,
  email: { type: String, unique: true },
});

export class User {
  constructor(
    public id: string,
    public name: string,
    public role: string,
    public password: string,
    public dob: Date,
    public email: string,
  ) {}
}

export interface User {
  id: string;
  name: string;
  role: string;
  password: string;
  dob: Date;
  email: string;
}
