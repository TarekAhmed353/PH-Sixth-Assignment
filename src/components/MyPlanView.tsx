"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import Loader from "./Loader";
import PlanItemCard from "./PlanItemCard";
import type { Workout } from "@/lib/types";

type Tab = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

const tabs = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
] as const;

function sortWorkouts(list: Workout[], key: SortKey) {
  const copy = [...list];
  if (key === "duration") return copy.sort((a, b) => a.duration - b.duration);
  if (key === "calories")
    return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  return copy.sort((a, b) => b.rating - a.rating);
}

export default function MyPlanView() {
  const { plan, saved, isLoaded, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const stats = [
    { label: "Exercises", value: plan.length, highlight: true },
    { label: "Minutes", value: totalMinutes, highlight: false },
    { label: "Calories", value: totalCalories, highlight: false },
  ];

  const currentList = sortWorkouts(
    activeTab === "plan" ? plan : saved,
    sortBy
  );

  const handleMarkDone = (workout: Workout) => {
    markAsDone(workout.id);
    toast.success(`${workout.name} done. Nice work!`);
  };

  const handleRemove = (workout: Workout) => {
    if (activeTab === "plan") {
      removeFromPlan(workout.id);
      toast.success("Removed from today's plan");
    } else {
      removeFromSaved(workout.id);
      toast.success("Removed from saved");
    }
  };

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6 md:py-14">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">
            My Plan
          </h1>
          <p className="text-base-content/60">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-base-300 rounded-2xl border border-base-300 bg-base-200">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 sm:p-6">
              <p className="text-xs text-base-content/50 sm:text-sm">
                {stat.label}
              </p>
              <p
                className={`font-display text-3xl font-bold sm:text-4xl ${
                  stat.highlight ? "text-primary" : ""
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-xl border border-base-300 bg-base-200 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-4 py-1.5 text-sm transition-colors ${
                  activeTab === tab.key
                    ? "bg-base-300 font-semibold text-base-content"
                    : "text-base-content/50 hover:text-base-content"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-sm text-base-content/60">
            Sort By
            <span className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="appearance-none rounded-lg border border-base-300 bg-base-200 py-1.5 pl-3 pr-8 text-sm text-base-content focus:border-primary focus:outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content"
              />
            </span>
          </label>
        </div>

        {!isLoaded ? (
          <Loader />
        ) : currentList.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-base-300 px-4 py-16 text-center">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide">
              Nothing here yet
            </h2>
            <p className="text-sm text-base-content/60">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="btn btn-primary btn-sm mt-2 rounded-full px-5"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {currentList.map((workout) => (
              <PlanItemCard
                key={workout.id}
                workout={workout}
                onMarkDone={
                  activeTab === "plan"
                    ? () => handleMarkDone(workout)
                    : undefined
                }
                onRemove={() => handleRemove(workout)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}