import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center md:flex-row md:justify-between md:px-6 md:text-left">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={24}
            height={24}
            className="h-5 w-auto"
          />
          <span className="font-display text-base font-bold tracking-wide">
            FITLOG
          </span>
        </Link>
        <p className="text-xs text-base-content/50">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}