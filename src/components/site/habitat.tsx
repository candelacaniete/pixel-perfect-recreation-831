/** Sky, mist and water shared by a guardian's page. No extra animals. */
export function LlanosSky() {
  return (
    <div aria-hidden className="sky-llanos absolute inset-0">
      <span className="cloud-puff" style={{ left: "6%", top: "16%", width: "30vw", height: "12vw" }} />
      <span className="cloud-puff" style={{ left: "42%", top: "6%", width: "36vw", height: "14vw", animationDelay: "-14s" }} />
      <span className="cloud-puff" style={{ left: "68%", top: "24%", width: "24vw", height: "10vw", animationDelay: "-7s" }} />
    </div>
  );
}

export function WaterLive({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`water-live ${className}`} />;
}

export function Mist() {
  return <div aria-hidden className="mist" />;
}
