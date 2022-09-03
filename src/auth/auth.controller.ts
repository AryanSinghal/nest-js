import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Get('login')
  login(@Req() request: Request, @Res() response: Response) {
    const { email, password } = request.body;
    return this.authService.login(request, response, { email, pass: password });
  }

  @Post('signup')
  signup(@Req() request: Request) {
    const { name, role, password, dob, email } = request.body;

    return this.authService.signup({
      name,
      role,
      password,
      dob,
      email,
    });
  }
}
