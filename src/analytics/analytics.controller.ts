// src/analytics/analytics.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getStats() {
    return this.analyticsService.getStats();
  }
}