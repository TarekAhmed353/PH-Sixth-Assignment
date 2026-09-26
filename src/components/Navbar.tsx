"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-3 px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="h-6 w-auto"
          />
          <span className="font-display text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Page links: middle on desktop, own row on mobile */}
        <ul className="order-3 flex w-full justify-center gap-2 md:order-0 md:w-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-base-content/60 hover:text-base-content"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Badges */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <span>Plan</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-content">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-base-content/60 hover:text-base-content"
          >
            <span>Saved</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-base-content/30 px-1.5 text-xs font-semibold text-base-content">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}