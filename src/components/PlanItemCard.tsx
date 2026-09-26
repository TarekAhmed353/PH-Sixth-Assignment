import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/lib/types";

interface PlanItemCardProps {
  workout: Workout;
  onMarkDone?: () => void;
  onRemove: () => void;
}

export default function PlanItemCard({
  workout,
  onMarkDone,
  onRemove,
}: PlanItemCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold uppercase tracking-wide">
            {workout.name}
          </h3>
          <p className="text-xs text-base-content/50">{workout.equipment}</p>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-base-content/70">
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-primary" />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={13} className="text-primary" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star size={13} className="text-primary" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="btn btn-sm btn-outline rounded-full border-base-300 font-normal hover:border-primary hover:bg-transparent hover:text-primary"
        >
          View Details
        </Link>
        {onMarkDone && (
          <button
            onClick={onMarkDone}
            className="btn btn-sm btn-primary gap-1 rounded-full"
          >
            <Check size={14} />
            Mark as Done
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="btn btn-sm btn-ghost btn-circle text-base-content/50 hover:text-base-content"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}