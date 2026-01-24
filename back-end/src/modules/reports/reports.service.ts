import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { NotificationsProducer } from '../../queues/producers/notifications.producer';
import { CreateReportDto } from './dto/create-report.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly notificationsProducer: NotificationsProducer,
  ) {}

  async create(userId: string, createDto: CreateReportDto) {
    const report = await this.reportsRepository.create({
      ...createDto,
      userId,
      isResolved: false,
    });

    await this.notificationsProducer.sendNotification(
      'admin',
      'NEW_REPORT',
      { reportId: report.id, qcmId: createDto.qcmId },
    );

    return report;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [reports, total] = await Promise.all([
      this.reportsRepository.findAll(limit, offset),
      this.reportsRepository.count(),
    ]);

    return {
      data: reports,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findUnresolved(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [reports, total] = await Promise.all([
      this.reportsRepository.findUnresolved(limit, offset),
      this.reportsRepository.countUnresolved(),
    ]);

    return {
      data: reports,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async resolve(id: string, adminId: string, resolveDto: ResolveReportDto) {
    const report = await this.reportsRepository.findById(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const resolved = await this.reportsRepository.update(id, {
      isResolved: true,
      resolvedBy: adminId,
      resolvedAt: new Date(),
      ...resolveDto,
    });

    await this.notificationsProducer.sendNotification(
      report.userId,
      'REPORT_RESOLVED',
      { reportId: id, qcmId: report.qcmId },
    );

    return resolved;
  }
}