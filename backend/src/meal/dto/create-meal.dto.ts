import { Activity, Food, Profile } from '@prisma/client';

export class CreateMealDto {
  id?: string;
  name: string;
  description: string;
  totalCalories: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  snack: boolean;
  visibility: boolean;

  profile?: Profile; // ? means optional
  food: Food;
  activities?: Activity; // optional for now, used later for sprint3
}
