import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import {
  CreateWorkoutDto,
  CreateWorkoutFromTemplateDto,
} from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ExampleCreateWorkoutTempalte } from './dto/example-create-workout';
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('/workout-template')
  @ApiBody({
    required: true,
    type: CreateWorkoutDto,
  })
  @ApiCreatedResponse({
    description: 'Created Workout template',
    type: CreateWorkoutDto,
    example: ExampleCreateWorkoutTempalte,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createWorkoutTemplate(@Body() createWorkoutDto: CreateWorkoutDto) {
    return await this.workoutService.createWorkoutTemplate(createWorkoutDto);
  }

  @Post('/workout-from-template')
  @ApiBody({
    required: true,
    type: CreateWorkoutFromTemplateDto,
  })
  @ApiCreatedResponse({
    description: 'Created workout from template',
    type: CreateWorkoutDto,
    example: ExampleCreateWorkoutTempalte,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createWorkoutFromTemplate(
    @Body() payload: CreateWorkoutFromTemplateDto,
  ) {
    const workoutTemplate = await this.workoutService.findOne(
      payload.workoutId,
    );

    if (workoutTemplate) {
      const workout = new CreateWorkoutDto();
      workout.userId = payload.userId;
      workout.description = workoutTemplate.description;
      workout.name = workoutTemplate.name;
      workout.imageUrl = workoutTemplate.imageUrl; // might not be needed later
      workout.exercises = workoutTemplate.exercises.map((e) => ({
        ...e,
        id: '',
        workoutId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      return this.workoutService.createWorkoutFromTemplate(workout);
    }
    return null;
  }

  // TODO
  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'the workout id',
  })
  @ApiResponse({
    description: 'Find one workout from template',
    type: CreateWorkoutDto,
    example: ExampleCreateWorkoutTempalte,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Param('id') id: string) {
    return await this.workoutService.findOne(id);
  }

  // TODO
  @ApiExcludeEndpoint() // TODO remove this line when done
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(+id, updateWorkoutDto);
  }

  // TODO
  @ApiExcludeEndpoint() // TODO remove this line when done
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }
}
