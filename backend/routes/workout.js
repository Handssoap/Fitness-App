const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /workouts/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: true,
      },
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

module.exports = router;
