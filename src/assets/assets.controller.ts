import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AssetsService } from './assets.service';

@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
  constructor(private readonly svc: AssetsService) {}

  @Get('health')
  health() {
    return { ok: true, module: 'assets' };
  }
}
