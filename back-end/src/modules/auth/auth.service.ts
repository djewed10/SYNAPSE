import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { ActivationCodesService } from '../activation-codes/activation-codes.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly activationCodesService: ActivationCodesService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (without activation)
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      role: 'user',
      competitiveModeEnabled: true,
      notificationsEnabled: true,
      dailyGoal: 0,
    });

    const { password: _, ...result } = user;

    return {
      message: 'Registration successful. Please activate your account with an activation code.',
      user: result,
    };
  }

  async activateAccount(activateDto: ActivateAccountDto) {
    const { email, code } = activateDto;

    // Find user
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if already activated
    if (user.activationCodeId) {
      throw new BadRequestException('Account already activated');
    }

    // Validate activation code
    const activationCode = await this.activationCodesService.validateAndUseCode(code, email);

    // Update user with activation code and plan
    await this.usersRepository.update(user.id, {
      activationCodeId: activationCode.id,
      planType: activationCode.planType,
      planExpiresAt: activationCode.expiresAt,
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      message: 'Account activated successfully',
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if account is activated
    if (!user.activationCodeId) {
      throw new UnauthorizedException('Account not activated. Please activate your account first.');
    }

    // Check if plan is expired
    if (user.planExpiresAt && new Date(user.planExpiresAt) < new Date()) {
      throw new UnauthorizedException('Your plan has expired. Please renew your subscription.');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // Update last login
    await this.usersRepository.updateLastActive(user.id);

    const { password: _, ...userWithoutPassword } = user;

    return {
      message: 'Login successful',
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersRepository.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user.id, user.email, user.role);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(userId: string) {
    return this.usersService.findById(userId);
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists
      return { message: 'If the email exists, a reset link has been sent' };
    }

    // TODO: Generate reset token and send email
    const resetToken = this.jwtService.sign(
      { email: user.email, purpose: 'password-reset' },
      { expiresIn: '1h' },
    );

    // TODO: Send email with reset token
    console.log('Reset token:', resetToken);

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    try {
      const payload = this.jwtService.verify(token);
      
      if (payload.purpose !== 'password-reset') {
        throw new BadRequestException('Invalid reset token');
      }

      const user = await this.usersRepository.findByEmail(payload.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.usersService.updatePassword(user.id, newPassword);

      return { message: 'Password reset successful' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN')|| '29d',
      }),
    ]);
  console.log('JWT_EXPIRES_IN:', this.configService.get('JWT_EXPIRES_IN')|| '7d');
    console.log("Generated Tokens:", { accessToken, refreshToken });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '7d'),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}