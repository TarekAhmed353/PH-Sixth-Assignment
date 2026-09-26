import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export default async function Library() {
  const workouts = await getAllWorkouts();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}