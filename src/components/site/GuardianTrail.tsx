import stand from "@/assets/living/capy-stand.jpg";
import work from "@/assets/living/capy-work.jpg";
import step from "@/assets/living/capy-step.jpg";

const poses = [stand, work, step] as const;
const poseNames = ["standing with his tools", "leaning into the work", "stepping in place"];

/** The mechanic stays beside the form and changes pose as the inquiry fills in. */
export function GuardianTrail({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress));
  const pose = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
  return (
    <div>
      <p className="eyebrow text-crimson">The capybara mechanic</p>
      <p className="mt-2 max-w-xs font-display text-2xl italic leading-snug">Tools in hand. He moves when the inquiry does.</p>
      <img
        src={poses[pose]}
        alt={`The capybara mechanic, ${poseNames[pose]}`}
        width={1024}
        height={1024}
        className="mx-auto mt-6 w-52 object-contain md:w-64"
      />
      <div className="relative mt-4 h-2" aria-hidden>
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink/20" />
        <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-scarlet transition-[width] duration-700" style={{ width: `${p * 100}%` }} />
      </div>
      <p className="sr-only">{Math.round(p * 100)} percent of the inquiry is filled in.</p>
    </div>
  );
}
