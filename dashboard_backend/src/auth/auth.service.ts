import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, pass: string) {
    // Email kontrolü
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) throw new BadRequestException('Bu email zaten kayıtlı.');

    // Şifreleme
    const hashedPassword = await bcrypt.hash(pass, 10);
    
    // Kayıt
    const user = await this.usersService.create({ username, email, password: hashedPassword });
    return { message: 'Kayıt başarılı!', userId: user.id };
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Kullanıcı bulunamadı.');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Şifre hatalı.');

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, email: user.email }
    };
  }
}