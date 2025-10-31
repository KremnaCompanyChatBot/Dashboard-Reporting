import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AnalyticsService {
  private data: any;

  constructor() {
    const p = path.resolve(process.cwd(), 'mock-data.json');
    this.data = JSON.parse(fs.readFileSync(p, 'utf8'));
  }

  records() {
    return this.data.analytics || [];
  }
}
