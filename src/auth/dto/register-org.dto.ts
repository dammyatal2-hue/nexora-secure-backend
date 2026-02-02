import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterOrgDto {
  @IsString()
  orgName: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsEmail()
  ownerEmail: string;

  @IsString()
  @MinLength(8)
  ownerPassword: string;

  @IsOptional()
  @IsString()
  ownerName?: string;
}
