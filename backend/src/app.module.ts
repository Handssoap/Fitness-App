import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [PrismaModule, WorkoutModule, ExerciseModule],
  controllers: [],
  providers: [AppService, PrismaService  ],
})
export class AppModule {}
