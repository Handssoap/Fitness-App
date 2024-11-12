import { Module } from '@nestjs/common';
import { ClerkController } from './clerk.controller';
import { ClerkService } from './clerk.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClerkController],
  providers: [ClerkService, PrismaService],
})
export class ClerkModule {}
