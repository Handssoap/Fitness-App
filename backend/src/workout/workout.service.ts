import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { userInfo } from 'os';

@Injectable()
export class WorkoutService {
  selectExercise = {
    id: true,
    name: true,
    description: true,
    reps: true,
    sets: true,
    weight: true,
    units: true,
    imageUrl: true,
  };

  selectWorkout = {
    id: true,
    name: true,
    description: true,
    userId: true,
    imageUrl: true,
    visibility: true,
    exercises: {
      select: this.selectExercise,
    },
  };

  constructor(private prisma: PrismaService) {}

  /**
   * Create a workout template and associated exercises from the dto, then connect it to a profile using userId
   *
   * @param dto the payload
   * @returns Workout object
   */
  async createWorkoutTemplate(dto: CreateWorkoutDto) {
    const workout = await this.prisma.workout.create({
      data: {
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        visibility: dto.visibility,
        userId: dto.userId,
        exercises: {
          createMany: {
            data: dto.exercises,
          },
        },
        profilesForWorkoutTemplates: {
          connect: {
            userId: dto.userId, // connects to profile owner
          },
        },
      },
      select: this.selectWorkout,
    });
    return workout;
  }

  async createWorkoutFromTemplate(dto: CreateWorkoutDto) {
    return await this.prisma.workout.create({
      data: {
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        userId: dto.userId,
        profilesForWorkout: {
          connect: { userId: dto.userId },
        },
        exercises: {
          createMany: {
            data: dto.exercises.map((e) => ({
              name: e.name,
              description: e.description,
              imageUrl: e.imageUrl,
              reps: e.reps,
              sets: e.sets,
              units: e.units,
              weight: e.weight,
            })),
          },
        },
      },
      select: this.selectWorkout,
    });
  }

  async findOne(workoutId: string) {
    return await this.prisma.workout.findFirst({
      where: { id: workoutId },
      include: {
        exercises: { select: this.selectExercise },
      },
    });
  }

 async findAliWorkoutTemplates(userId: string) {
    return await this.prisma.workout.findMany({
      where: {
        userId
      }, 
      include: {
        exercises: true
      }
    })
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
