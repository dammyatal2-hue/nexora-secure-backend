import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterOrgDto } from './dto/register-org.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async registerOrg(dto: RegisterOrgDto) {
    const existing = await this.prisma.user.findFirst({
      where: { email: dto.ownerEmail },
      select: { id: true },
    });
    if (existing) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.ownerPassword, 10);

    const org = await this.prisma.organization.create({
      data: {
        name: dto.orgName,
        industry: dto.industry,
        users: {
          create: {
            email: dto.ownerEmail,
            name: dto.ownerName,
            passwordHash,
            role: 'OWNER',
            status: 'ACTIVE',
          },
        },
      },
      include: { users: true },
    });

    const owner = org.users[0];
    return this.issueTokens(owner.id, org.id, owner.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!user) throw new BadRequestException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new BadRequestException('Invalid credentials');

    return this.issueTokens(user.id, user.orgId, user.role);
  }

  private issueTokens(userId: string, orgId: string, role: string) {
    const accessSecret = process.env.JWT_ACCESS_SECRET || 'dev_access';
    const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '15m';

    const payload = { sub: userId, orgId, role };
    const accessToken = this.jwt.sign(payload, { secret: accessSecret, expiresIn: accessExpiresIn });

    return { accessToken };
  }
}
