import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ClerkModule } from './clerk/clerk.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    PrismaModule,
    WorkoutModule,
    ExerciseModule,
    ClerkModule,
  ],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
