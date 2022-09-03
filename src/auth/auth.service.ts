import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './auth.model';

@Injectable({})
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async login(req, res, { email, pass }) {
    const user = await this.userModel.findOne({
      email,
      deletedAt: { $exists: false },
    });

    console.log('.>>>>>>>>>>user', user);
    if (!user) {
      return res.status(400).json({
        message: 'Invalid username or password',
      });
    }
    const { password } = user;
    if (password === pass) {
      return res.status(200).json({
        message: 'User successfully logged In',
      });
    }
    return res.status(400).json({
      message: 'Invalid username or password',
    });
  }

  async signup({ name, role, password, dob, email }) {
    const newUser = new this.userModel({
      name,
      role,
      email,
      password,
      dob,
    });
    const result = await newUser.save();
    console.log('>>>>>>>>>>inside signup', result);

    return {
      status: 200,
      message: 'User successfully created',
      data: result,
      timestamp: new Date(),
    };
  }
}
