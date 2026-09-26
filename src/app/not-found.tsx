import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="space-y-4 text-center">
        <p className="font-display text-8xl font-bold text-primary sm:text-9xl">
          404
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
          Missed the rep
        </h1>
        <p className="mx-auto max-w-sm text-base-content/60">
          This page doesn&apos;t exist. Head back to the library and pick a
          lift.
        </p>
        <Link href="/" className="btn btn-primary rounded-full px-6">
          Back to workouts
        </Link>
      </div>
    </main>
  );
}