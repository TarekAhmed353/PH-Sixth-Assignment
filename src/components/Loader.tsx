interface LoaderProps {
  label?: string;
}

export default function Loader({ label = "Loading workouts…" }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-base-content/60">{label}</p>
    </div>
  );
}