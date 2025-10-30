import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AssistantsService {
  private data: any;

  constructor() {
    const p = path.resolve(process.cwd(), 'mock-data.json');
    this.data = JSON.parse(fs.readFileSync(p, 'utf8'));
  }

  findAll() {
    return this.data.assistants || [];
  }
}
