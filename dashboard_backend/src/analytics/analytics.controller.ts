import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '@nestjs/passport'; // <-- Bunu eklemeyi unutma

@Controller('analytics')
@UseGuards(AuthGuard('jwt')) // <-- Endpoint'i korumaya alıyoruz
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getStats(@Request() req) { // <-- Request nesnesini içeri alıyoruz
    // Servis artık userId bekliyor, biz de token'dan gelen ID'yi veriyoruz
    return this.analyticsService.getStats(req.user.userId);
  }
}