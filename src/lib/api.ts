import type { Workout } from "./types";
import { fallbackWorkouts } from "./fallback-workouts";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE, { cache: "no-store" });
    if (!res.ok) return fallbackWorkouts;
    return await res.json();
  } catch {
    return fallbackWorkouts;
  }
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      return data?.id ? data : null;
    }
    if (res.status === 404) return null;
  } catch {}

  return fallbackWorkouts.find((w) => String(w.id) === id) ?? null;
}