import { Suspense } from "react";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <section
        id="library"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 md:px-6"
      >
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold uppercase">
            The Library
          </h2>
          <p className="text-base-content/60">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <Suspense fallback={<Loader />}>
          <Library />
        </Suspense>
      </section>
    </main>
  );
}