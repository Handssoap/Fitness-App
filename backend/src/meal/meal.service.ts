import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MealService {
  constructor(private prisma: PrismaService) {}

  //TODO
  create(createMealDto: CreateMealDto) {
    return 'This action adds a new meal';
  }
  //TODO
  findAll() {
    return `This action returns all meal`;
  }
  //TODO
  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  // update(id: number, updateMealDto: UpdateMealDto) {
  //   return `This action updates a #${id} meal`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} meal`;
  // }
}
