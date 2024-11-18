import { useEffect, useState } from "react";

export interface Exercise {
  id: string;
  name: string;
  image: string;
  type?: string;
  muscle?: string;
  equipment?: string;
  difficulty?: string;
  instructions?: string;
}

type useFetchExercisesProps = {
  api_key: string;
};

export const useFetchExercises = (props: useFetchExercisesProps) => {
  //Fetch external api
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<string>("biceps");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const muscleOptions = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError(null);
        setSelectedExercise(null);
        const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscle}`;
        const response = await fetch(apiUrl, {
          headers: {
            "X-Api-Key": props.api_key!,
          },
        });

        if (response.ok) {
          const data: any[] = await response.json();
          const exercisesWithImages: Exercise[] = data.map(
            (exercise: any, index: number) => ({
              id: index.toString(),
              name: exercise.name,
              image: exercise.image || "https://example.com/default-image.png",
              type: exercise.type,
              muscle: exercise.muscle,
              equipment: exercise.equipment,
              difficulty: exercise.difficulty,
              instructions: exercise.instructions,
            })
          );
          setExercises(exercisesWithImages);
        } else {
          const errorData = await response.text();
          throw new Error(`Error ${response.status}: ${errorData}`);
        }
      } catch (err: any) {
        console.error("Error fetching exercises:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [selectedMuscle]);

  return {
    exercises,
    setExercises,
    selectedMuscle,
    setSelectedMuscle,
    selectedExercise,
    setSelectedExercise,
    workoutExercises,
    setWorkoutExercises,
    loading,
    setLoading,
    error,
    setError,
    muscleOptions,
  };
};
