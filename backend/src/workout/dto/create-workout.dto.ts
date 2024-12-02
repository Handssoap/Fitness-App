import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Activity, Exercise, Workout } from '@prisma/client';

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Auto generated',
    type: 'string',
  })
  id?: string;
  @ApiPropertyOptional({
    description: 'profileId from clerk',
    type: 'string',
  })
  userId: string;
  @ApiPropertyOptional({
    description: 'name of workout',
    type: 'string',
  })
  name: string;
  @ApiPropertyOptional({
    description: 'description of name',
    type: 'string',
  })
  description: string;
  @ApiPropertyOptional({
    description: 'image for the workout(optional for sprint2)',
    type: 'string',
  })
  imageUrl: string;
  @ApiPropertyOptional({
    description: 'array of exercises',
    type: 'array',
    example: {
      description: 'string',
      id: 'string',
      name: 'string',
      imageUrl: 'string',
      sets: 'number',
      reps: 'number',
      weight: 'number',
      units: 'string',
      workoutId: 'string',
    },
  })
  exercises: Exercise[];
  @ApiProperty({
    description: 'wether workout is public or private',
    type: 'boolean',
  })
  visibility: boolean;
  workouts?: Workout[];
  workoutTemplates?: Workout[];
  activityHistory?: Activity[];
}

export class CreateWorkoutFromTemplateDto {
  @ApiPropertyOptional({
    name: 'workoutId',
    description: 'The workout id',
    type: 'string',
  })
  workoutId: string;
  @ApiPropertyOptional({
    name: 'userid',
    description: 'The user id from clerk in profile',
    type: 'string',
  })
  userId: string;
}
