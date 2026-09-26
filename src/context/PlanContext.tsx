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
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(data.plan ?? []);
        setSaved(data.saved ?? []);
      }
    } catch {}
    setIsLoaded(true);
  }, []);
 

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch {}
  }, [plan, saved, isLoaded]);

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
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((w) => w.id !== id));
  };

  const markAsDone = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
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