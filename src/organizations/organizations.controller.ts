import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OrganizationsService } from './organizations.service';

@UseGuards(JwtAuthGuard)
@Controller('org')
export class OrganizationsController {
  constructor(private readonly svc: OrganizationsService) {}

  @Get('health')
  health() {
    return { ok: true, module: 'organizations' };
  }
}
