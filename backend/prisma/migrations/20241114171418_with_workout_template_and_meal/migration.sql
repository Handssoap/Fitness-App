/*
  Warnings:

  - You are about to drop the column `profileId` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `units` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_profileId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "units" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "profileId",
ADD COLUMN     "visibility" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalCalories" DOUBLE PRECISION NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "lunch" BOOLEAN NOT NULL,
    "dinner" BOOLEAN NOT NULL,
    "snack" BOOLEAN NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Health" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "units" TEXT NOT NULL,
    "calories" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "healthId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_profilesForWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_profilesForWorkoutTemplates" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MealToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FoodToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Health_profileId_key" ON "Health"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_healthId_key" ON "Activity"("healthId");

-- CreateIndex
CREATE UNIQUE INDEX "_profilesForWorkout_AB_unique" ON "_profilesForWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_profilesForWorkout_B_index" ON "_profilesForWorkout"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_profilesForWorkoutTemplates_AB_unique" ON "_profilesForWorkoutTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_profilesForWorkoutTemplates_B_index" ON "_profilesForWorkoutTemplates"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealToProfile_AB_unique" ON "_MealToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_MealToProfile_B_index" ON "_MealToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToMeal_AB_unique" ON "_FoodToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToMeal_B_index" ON "_FoodToMeal"("B");

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "Health_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_healthId_fkey" FOREIGN KEY ("healthId") REFERENCES "Health"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_profilesForWorkout" ADD CONSTRAINT "_profilesForWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_profilesForWorkout" ADD CONSTRAINT "_profilesForWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_profilesForWorkoutTemplates" ADD CONSTRAINT "_profilesForWorkoutTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_profilesForWorkoutTemplates" ADD CONSTRAINT "_profilesForWorkoutTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToProfile" ADD CONSTRAINT "_MealToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToProfile" ADD CONSTRAINT "_MealToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToMeal" ADD CONSTRAINT "_FoodToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToMeal" ADD CONSTRAINT "_FoodToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
