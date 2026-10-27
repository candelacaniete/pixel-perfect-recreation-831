import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Shell } from "@/components/site/Shell";
import { inquiryFromSearch, inquiryTypes, publishedEmail, type InquiryType } from "@/content/yrmis";

export function ContactPage({ interest }: { interest: InquiryType }) {
  const navigate = useNavigate();
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
    <Shell page>
      <main className="swrap">
        <header className="phead">
          <div>
            <div className="eyebrow red">Work with me</div>
            <h1 className="d">
              Let’s make
              <br />
              <em>things happen.</em>
            </h1>
          </div>
          <p className="lede">Tell me what you’re building, planning, or trying to figure out. We’ll start there.</p>
        </header>
        <form className="form" onSubmit={onSubmit} noValidate style={{ maxWidth: 720, paddingBottom: 20 }}>
          <div className="notice">
            <strong>This form does not send.</strong> For a real inquiry, email <a href={`mailto:${publishedEmail}`}>{publishedEmail}</a>.
          </div>
          <label htmlFor="yb-interest">I’m interested in</label>
          <select
            id="yb-interest"
            value={interest}
            onChange={(event) => {
              setResult("");
              void navigate({
                to: "/contact",
                search: { interest: inquiryFromSearch(event.target.value) },
                replace: true,
              });
            }}
          >
            {inquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <label htmlFor="yb-name">Name</label>
          <input id="yb-name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="yb-email">Email</label>
          <input id="yb-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          {speaking ? (
            <>
              <label htmlFor="yb-org">Organization</label>
              <input id="yb-org" autoComplete="organization" value={organization} onChange={(event) => setOrganization(event.target.value)} />
              <label htmlFor="yb-date">Event date</label>
              <input id="yb-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              <label htmlFor="yb-location">Location or virtual</label>
              <input id="yb-location" value={location} onChange={(event) => setLocation(event.target.value)} />
              <label htmlFor="yb-audience">Audience and desired outcomes</label>
              <input id="yb-audience" value={audience} onChange={(event) => setAudience(event.target.value)} />
            </>
          ) : (
            <>
              <label htmlFor="yb-project">Company / project</label>
              <input id="yb-project" value={project} onChange={(event) => setProject(event.target.value)} />
              <label htmlFor="yb-challenge">Current challenge</label>
              <input id="yb-challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} />
              <label htmlFor="yb-timing">Timing</label>
              <input id="yb-timing" value={timing} onChange={(event) => setTiming(event.target.value)} />
            </>
          )}
          <label htmlFor="yb-message">What are you working on?</label>
          <textarea id="yb-message" value={message} onChange={(event) => setMessage(event.target.value)} />
          {error && (
            <p className="notice" role="alert">
              {error}
            </p>
          )}
          <button className="btn red" type="submit">
            Review inquiry
          </button>
          <p role="status">{result}</p>
        </form>
      </main>
    </Shell>
  );
}
