import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <main className="flex-1">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-6 md:py-14">
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-base-300 md:sticky md:top-24 md:self-start">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
              {workout.name}
            </h1>
            <p className="text-base-content/60">{workout.description}</p>
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-content"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          <div className="divide-y divide-base-300 overflow-hidden rounded-xl border border-base-300 bg-base-200">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-base-content/50">
                  {spec.label}
                </span>
                <span className="text-right">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="space-y-2 text-sm text-base-content/80">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-base-content/50">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </main>
  );
}