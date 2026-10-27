import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Shell } from "@/components/site/Shell";
import { GuardianTrail } from "@/components/site/GuardianTrail";
import { markVisited } from "@/components/safari/visited";
import { inquiryFromSearch, inquiryTypes, publishedEmail, type InquiryType } from "@/content/yrmis";

export function ContactPage({ interest }: { interest: InquiryType }) {
  const navigate = useNavigate();
  useEffect(() => markVisited("contact"), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [audience, setAudience] = useState("");
  const [project, setProject] = useState("");
  const [challenge, setChallenge] = useState("");
  const [timing, setTiming] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const speaking = interest === "Speaking";
  const field = "mt-2 w-full border-b-2 border-ink bg-transparent py-3 text-lg outline-none focus:border-tangerine";
  const answers = speaking
    ? [name, email, organization, date, location, audience, message]
    : [name, email, project, challenge, timing, message];
  const progress = answers.filter((value) => value.trim()).length / answers.length;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.includes("@")) {
      setResult("");
      setError("Add a name and a valid email. Nothing was sent.");
      return;
    }
    setError("");
    setResult(`${interest} inquiry was not sent. Write to ${publishedEmail}.`);
  }

  return (
    <Shell tone="paper" current="Contact">
      <main className="bg-paper px-5 pb-20 pt-28 text-ink md:px-12">
        <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-crimson">Work with me</p>
        <h1 className="display-lg mt-3 max-w-3xl">Let’s make things happen.</h1>
        <p className="mt-4 max-w-xl text-lg">Tell me what you’re building, planning, or trying to figure out. We’ll start there.</p>
        <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
        <form onSubmit={onSubmit} noValidate className="order-2 grid gap-6 md:order-1">
          <p className="border-l-4 border-scarlet bg-scarlet/10 px-4 py-3 text-sm">
            <strong>This form does not send.</strong> For a real inquiry, email <a className="underline" href={`mailto:${publishedEmail}`}>{publishedEmail}</a>.
          </p>
          <label>
            <span className="eyebrow">I’m interested in</span>
            <select className={field} value={interest} onChange={(event) => { setResult(""); void navigate({ to: "/contact", search: { interest: inquiryFromSearch(event.target.value) }, replace: true }); }}>
              {inquiryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label><span className="eyebrow">Name</span><input className={field} autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label><span className="eyebrow">Email</span><input className={field} type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          {speaking ? (
            <>
              <label><span className="eyebrow">Organization</span><input className={field} autoComplete="organization" value={organization} onChange={(event) => setOrganization(event.target.value)} /></label>
              <label><span className="eyebrow">Event date</span><input className={field} type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
              <label><span className="eyebrow">Location or virtual</span><input className={field} value={location} onChange={(event) => setLocation(event.target.value)} /></label>
              <label><span className="eyebrow">Audience and desired outcomes</span><input className={field} value={audience} onChange={(event) => setAudience(event.target.value)} /></label>
            </>
          ) : (
            <>
              <label><span className="eyebrow">Company / project</span><input className={field} value={project} onChange={(event) => setProject(event.target.value)} /></label>
              <label><span className="eyebrow">Current challenge</span><input className={field} value={challenge} onChange={(event) => setChallenge(event.target.value)} /></label>
              <label><span className="eyebrow">Timing</span><input className={field} value={timing} onChange={(event) => setTiming(event.target.value)} /></label>
            </>
          )}
          <label><span className="eyebrow">What are you working on?</span><textarea className={field} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} /></label>
          {error && <p role="alert" className="text-crimson">{error}</p>}
          <button className="pill w-fit bg-ink text-paper" type="submit">Review inquiry</button>
          <p role="status">{result}</p>
        </form>
        <div className="order-1 md:sticky md:top-28 md:order-2">
          <GuardianTrail progress={progress} />
        </div>
        </div>
        </div>
      </main>
    </Shell>
  );
}
