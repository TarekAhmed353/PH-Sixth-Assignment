import type { Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load workouts");
  }
  return res.json();
}
export async function getWorkoutById(id: string): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });

  if (!res.ok) {
    return null;
  }
  return res.json();
}