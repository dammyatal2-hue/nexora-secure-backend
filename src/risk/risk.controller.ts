import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RiskService } from './risk.service';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class RiskController {
  constructor(private readonly svc: RiskService) {}

  @Get('health')
  health() {
    return { ok: true, module: 'risk' };
  }
}
