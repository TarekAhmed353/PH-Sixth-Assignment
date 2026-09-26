import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "@/lib/types";

export default async function Library() {
  let workouts: Workout[] = [];

  try {
    workouts = await getAllWorkouts();
  } catch {
    return (
      <div className="rounded-2xl border border-base-300 px-4 py-16 text-center">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">
          Couldn&apos;t load workouts
        </h3>
        <p className="mt-2 text-sm text-base-content/60">
          The workout library is taking a breather. Refresh the page to try
          again.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}