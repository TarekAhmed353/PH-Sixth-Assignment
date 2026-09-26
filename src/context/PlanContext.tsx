"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import type { Workout } from "@/lib/types";

export const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-data";

export type AddResult = "added" | "exists" | "full";

interface PlanContextValue {
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => AddResult;
  saveForLater: (workout: Workout) => AddResult;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(data.plan ?? []);
        setSaved(data.saved ?? []);
        setCompletedIds(data.completedIds ?? []);
      }
    } catch {}
    setIsLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved, completedIds })
      );
    } catch {}
  }, [plan, saved, completedIds, isLoaded]);

  const addToPlan = (workout: Workout): AddResult => {
    if (plan.some((w) => w.id === workout.id)) return "exists";
    if (plan.length >= PLAN_LIMIT) return "full";
    setPlan([...plan, workout]);
    return "added";
  };

  const saveForLater = (workout: Workout): AddResult => {
    if (saved.some((w) => w.id === workout.id)) return "exists";
    setSaved([...saved, workout]);
    return "added";
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
    setCompletedIds(completedIds.filter((doneId) => doneId !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((w) => w.id !== id));
  };

  const markAsDone = (id: number) => {
    if (!completedIds.includes(id)) {
      setCompletedIds([...completedIds, id]);
    }
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        completedIds,
        isLoaded,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#12151a",
            color: "#f4f5f7",
            border: "1px solid #1c2027",
          },
          success: {
            iconTheme: { primary: "#ccff00", secondary: "#0b0d10" },
          },
        }}
      />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }
  return context;
}