"use client";

import toast from "react-hot-toast";
import { Bookmark, CalendarPlus } from "lucide-react";
import { PLAN_LIMIT, usePlan } from "@/context/PlanContext";
import type { Workout } from "@/lib/types";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { plan, addToPlan, saveForLater } = usePlan();

  const inPlan = plan.some((w) => w.id === workout.id);
  const planFull = plan.length >= PLAN_LIMIT && !inPlan;

  const handleAdd = () => {
    const result = addToPlan(workout);
    if (result === "added") {
      toast.success("Added to today's plan");
    } else if (result === "exists") {
      toast("Already in today's plan");
    } else {
      toast.error(`Plan is full. Cap of ${PLAN_LIMIT} lifts for today.`);
    }
  };

  const handleSave = () => {
    const result = saveForLater(workout);
    if (result === "added") {
      toast.success("Saved for later");
    } else {
      toast("Already in your saved list");
    }
  };

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <button
        onClick={handleAdd}
        disabled={planFull}
        className="btn btn-primary gap-2"
      >
        <CalendarPlus size={18} />
        {planFull ? "Plan is full" : "Add to today's plan"}
      </button>
      <button
        onClick={handleSave}
        className="btn btn-outline gap-2 border-base-300 hover:border-primary hover:bg-transparent hover:text-primary"
      >
        <Bookmark size={18} />
        Save for later
      </button>
    </div>
  );
}