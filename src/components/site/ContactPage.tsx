import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Shell } from "@/components/site/Shell";
import { GuardianTrail } from "@/components/site/GuardianTrail";
import { markVisited } from "@/components/safari/visited";
import { inquiryFromSearch, inquiryTypes, publishedEmail, siteCopy, type InquiryType } from "@/content/yrmis";

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
      <main className="llanos">
        <section className="ll-pad">
          <p className="ll-kicker">Work with me</p>
          <h1 className="ll-display" style={{ marginTop: "0.6rem", maxWidth: "12ch" }}>Let’s make things happen.</h1>
          <p className="ll-lede">Tell me what you’re building, planning, or trying to figure out. We’ll start there.</p>
          <p className="ll-lede">{siteCopy.conversation}</p>
          <div className="ll-contact" style={{ marginTop: "2.5rem" }}>
            <form onSubmit={onSubmit} noValidate className="ll-form">
              <p className="ll-note">
                <strong>This form does not send.</strong> For a real inquiry, email <a href={`mailto:${publishedEmail}`}>{publishedEmail}</a>.
              </p>
              <label>
                <span className="ll-kicker">I’m interested in</span>
                <select className="ll-field" value={interest} onChange={(event) => { setResult(""); void navigate({ to: "/contact", search: { interest: inquiryFromSearch(event.target.value) }, replace: true }); }}>
                  {inquiryTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <label><span className="ll-kicker">Name</span><input className="ll-field" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></label>
              <label><span className="ll-kicker">Email</span><input className="ll-field" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              {speaking ? (
                <>
                  <label><span className="ll-kicker">Organization</span><input className="ll-field" autoComplete="organization" value={organization} onChange={(event) => setOrganization(event.target.value)} /></label>
                  <label><span className="ll-kicker">Event date</span><input className="ll-field" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
                  <label><span className="ll-kicker">Location or virtual</span><input className="ll-field" value={location} onChange={(event) => setLocation(event.target.value)} /></label>
                  <label><span className="ll-kicker">Audience and desired outcomes</span><input className="ll-field" value={audience} onChange={(event) => setAudience(event.target.value)} /></label>
                </>
              ) : (
                <>
                  <label><span className="ll-kicker">Company / project</span><input className="ll-field" value={project} onChange={(event) => setProject(event.target.value)} /></label>
                  <label><span className="ll-kicker">Current challenge</span><input className="ll-field" value={challenge} onChange={(event) => setChallenge(event.target.value)} /></label>
                  <label><span className="ll-kicker">Timing</span><input className="ll-field" value={timing} onChange={(event) => setTiming(event.target.value)} /></label>
                </>
              )}
              <label><span className="ll-kicker">What are you working on?</span><textarea className="ll-field" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} /></label>
              {error && <p role="alert">{error}</p>}
              <button className="ll-btn ll-btn-ink" type="submit" style={{ width: "fit-content" }}>Review inquiry</button>
              <p className="ll-status" role="status">{result}</p>
            </form>
            <div>
              <GuardianTrail progress={progress} />
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
