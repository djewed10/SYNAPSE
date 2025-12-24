import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ActivationCodesRepository } from './activation-codes.repository';
import { CreateActivationCodeDto } from './dto/create-activation-code.dto';
import { BulkCreateCodesDto } from './dto/bulk-create-codes.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ActivationCodesService {
  constructor(
    private readonly activationCodesRepository: ActivationCodesRepository,
  ) {}

  async create(createDto: CreateActivationCodeDto) {
    const { code, planType, expiresAt, createdBy } = createDto;

    // Check if code already exists
    const existing = await this.activationCodesRepository.findByCode(code);
    if (existing) {
      throw new ConflictException('Activation code already exists');
    }

    return this.activationCodesRepository.create({
      code,
      planType,
      expiresAt,
      createdBy,
      isActive: true,
    });
  }

  async createBulk(bulkCreateDto: BulkCreateCodesDto) {
    const { count, planType, expiresAt, createdBy, prefix = 'MED' } = bulkCreateDto;

    const codes: Array<{ code: string; planType: "1_month" | "6_months" | "1_year" | "pro"; expiresAt: Date | undefined; createdBy: string; isActive: boolean }> = [];
    for (let i = 0; i < count; i++) {
      const code = this.generateCode(prefix);
      codes.push({
        code,
         planType,
        expiresAt,
        createdBy,
        isActive: true,
      });
    }

    return this.activationCodesRepository.createMany(codes);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [codes, total] = await Promise.all([
      this.activationCodesRepository.findAll(limit, offset),
      this.activationCodesRepository.count(),
    ]);

    return {
      data: codes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const code = await this.activationCodesRepository.findById(id);
    if (!code) {
      throw new NotFoundException('Activation code not found');
    }
    return code;
  }

  async validate(code: string) {
    const activationCode = await this.activationCodesRepository.findByCode(code);

    if (!activationCode) {
      throw new BadRequestException('Invalid activation code');
    }

    if (!activationCode.isActive) {
      throw new BadRequestException('Activation code has been deactivated');
    }

    if (activationCode.usedBy) {
      throw new BadRequestException('Activation code has already been used');
    }

    if (activationCode.expiresAt && new Date(activationCode.expiresAt) < new Date()) {
      throw new BadRequestException('Activation code has expired');
    }

    return {
      valid: true,
      planType: activationCode.planType,
      expiresAt: activationCode.expiresAt,
    };
  }

  async validateAndUseCode(code: string, userEmail: string) {
    await this.validate(code);

    const activationCode = await this.activationCodesRepository.findByCode(code);

    // Mark code as used
    await this.activationCodesRepository.markAsUsed(activationCode.id, userEmail);

    return this.activationCodesRepository.findById(activationCode.id);
  }

  async deactivate(id: string) {
    const code = await this.findById(id);

    if (code.usedBy) {
      throw new BadRequestException('Cannot deactivate a code that has been used');
    }

    return this.activationCodesRepository.update(id, { isActive: false });
  }

  private generateCode(prefix: string): string {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${year}-${random}`;
  }
}