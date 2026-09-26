import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <section
        id="library"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 md:px-6"
      >
        <h2 className="font-display text-3xl font-bold uppercase">
          The Library
        </h2>
        <p className="text-base-content/60">
          Library cards coming in the next step.
        </p>
      </section>
    </main>
  );
}