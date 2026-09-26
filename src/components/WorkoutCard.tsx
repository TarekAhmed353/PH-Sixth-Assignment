import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-content"
            >
              {group}
            </span>
          ))}
        </div>

        <div>
          <h3 className="font-display text-lg font-bold uppercase tracking-wide">
            {workout.name}
          </h3>
          <p className="text-sm text-base-content/50">{workout.equipment}</p>
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-base-300 pt-3 text-xs text-base-content/60">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}