import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  // TODO
  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  //TODO
  @Get()
  findAll() {
    return this.mealService.findAll();
  }

  //TODO
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealService.findOne(+id);
  }

  // @ApiExcludeEndpoint()
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
  //   return this.mealService.update(+id, updateMealDto);
  // }

  // @ApiExcludeEndpoint()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mealService.remove(+id);
  // }
}
