import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import * as bcrypt from 'bcrypt';
import { MultipartFile } from '@fastify/multipart';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.usersRepository.findAll(limit, offset),
      this.usersRepository.count(),
    ]);

    // Remove passwords from response
    const sanitizedUsers = users.map(({ password, ...user }) => user);

    return {
      data: sanitizedUsers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.findById(id);

    const updatedUser = await this.usersRepository.update(id, {
      ...updateProfileDto,
      updatedAt: new Date(),
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  async updateSettings(id: string, updateSettingsDto: UpdateSettingsDto) {
    const user = await this.findById(id);

    const updatedUser = await this.usersRepository.update(id, {
      ...updateSettingsDto,
      updatedAt: new Date(),
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  async uploadProfilePicture(id: string, file: MultipartFile) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const user = await this.findById(id);

    // TODO: Upload to S3/storage service
    // For now, we'll just store the filename
    const profilePictureUrl = `/uploads/profiles/${file.filename}`;

    const updatedUser = await this.usersRepository.update(id, {
      profilePicture: profilePictureUrl,
      updatedAt: new Date(),
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  async deleteProfilePicture(id: string) {
    const user = await this.findById(id);

    if (!user.profilePicture) {
      throw new BadRequestException('No profile picture to delete');
    }

    // TODO: Delete from S3/storage service

    await this.usersRepository.update(id, {
      profilePicture: null,
      updatedAt: new Date(),
    });
  }

  async updatePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.usersRepository.update(id, {
      password: hashedPassword,
      updatedAt: new Date(),
    });
  }

  async remove(id: string) {
    const user = await this.findById(id);
    return this.usersRepository.delete(id);
  }

  async incrementDailyGoalProgress(userId: string) {
    // This will be called when user answers a question
    // Can be used to track daily goal progress
    return this.usersRepository.findById(userId);
  }
}