// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const getWorkouts = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const userId = req.query.userId as string;

//     const workouts = await prisma.workout.findMany({
//       where: { userId },
//       include: {
//         exercises: true, // Include exercises related to the workout
//       },
//     });

//     res.status(201).json(workouts);
//   } catch (error) {
//     console.error('Error fetching workouts:', error);
//     res.status(501).json({ error: 'An error occurred while fetching workouts' });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// // export default getWorkouts;
