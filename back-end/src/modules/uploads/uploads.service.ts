import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';

@Injectable()
export class UploadsService {
  private readonly uploadDir: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: any, folder: string = 'general'): Promise<string> {
    const ext = path.extname(file.originalname);
    const filename = `${folder}/${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;
    const filePath = path.join(this.uploadDir, filename);
    
    const folderPath = path.dirname(filePath);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }

    await fs.writeFile(filePath, file.buffer);
    
    const baseUrl = this.configService.get('BASE_URL', 'http://localhost:3000');
    return `${baseUrl}/uploads/${filename}`;
  }

  async deleteFile(url: string): Promise<void> {
    const filename = url.split('/uploads/')[1];
    if (filename) {
      const filePath = path.join(this.uploadDir, filename);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }

  validateImage(file: any): boolean {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedMimes.includes(file.mimetype);
  }

  validateFile(file: any, maxSize: number = 5 * 1024 * 1024): boolean {
    return file.size <= maxSize;
  }
}