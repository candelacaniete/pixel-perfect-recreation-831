import capybara from "@/assets/g-capymech-authored.png";

/** The capybara mechanic walks the length of a path as a form is filled in. */
export function GuardianTrail({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress));
  const steps = [0.25, 0.5, 0.75, 1];
  return (
    <div aria-hidden={false}>
      <p className="eyebrow text-crimson">The capybara mechanic</p>
      <p className="mt-2 max-w-xs font-display text-2xl italic leading-snug">Tools in hand. He moves when the inquiry does.</p>
      <div className="relative mt-4 h-40 md:h-56">
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-ink/20" />
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-scarlet transition-[width] duration-700 ease-out" style={{ width: `${p * 100}%` }} />
        {steps.map((mark) => (
          <span
            key={mark}
            className={`absolute bottom-[-5px] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-ink ${p >= mark ? "bg-gold" : "bg-paper"}`}
            style={{ left: `${mark * 100}%` }}
          />
        ))}
        <img
          src={capybara}
          alt="The capybara mechanic, carrying tools, walking as the form is completed"
          width={768}
          height={1024}
          className="absolute bottom-2 w-28 transition-[left,transform] duration-700 ease-out md:w-36"
          style={{ left: `clamp(0px, calc(${p * 100}% - ${p * 5}rem), calc(100% - 7rem))` }}
        />
      </div>
      <p className="sr-only">{Math.round(p * 100)} percent of the inquiry is filled in.</p>
    </div>
  );
}
