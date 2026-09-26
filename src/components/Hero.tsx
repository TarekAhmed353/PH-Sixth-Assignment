import Image from "next/image";
import { Dumbbell } from "lucide-react";
import banner from "../../public/assets/banner.png";

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6 md:pt-12">
      <div className="grid items-center gap-8 rounded-3xl border border-base-300 bg-base-200 p-6 sm:p-10 md:grid-cols-2 lg:p-14">
        {/* Text side */}
        <div className="space-y-5 text-center md:text-left">
          <p className="text-xs font-semibold tracking-[0.25em] text-primary">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mx-auto max-w-md text-base-content/60 md:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="btn btn-primary inline-flex gap-2 font-semibold uppercase tracking-wide"
          >
            <Dumbbell size={18} />
            Browse workouts
          </a>
        </div>

        {/* Image side */}
        <div className="flex justify-center md:justify-end">
          <Image
            src={banner}
            alt="Athlete training on a gym machine"
            priority
            className="h-auto w-full max-w-xs sm:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}