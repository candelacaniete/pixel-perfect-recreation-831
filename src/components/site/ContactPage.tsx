import { Link, useNavigate } from "@tanstack/react-router";
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
    <Shell>
      <p className="ed-eyebrow">Work with me</p>
      <h1>
        Let’s make
        <br />
        <em>things happen.</em>
      </h1>
      <p>Tell me what you’re building, planning, or trying to figure out. We’ll start there.</p>
      <form onSubmit={onSubmit} noValidate>
        <div className="ed-notice">
          <strong>This form does not send.</strong>
          <br />
          For a real inquiry, email <a href={`mailto:${publishedEmail}`}>{publishedEmail}</a>. The address is the one printed in the press kits.
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
        <div className="ed-grid">
          <div className="ed-w2">
            <label htmlFor="yb-name">Name</label>
            <input id="yb-name" name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="ed-w2">
            <label htmlFor="yb-email">Email</label>
            <input id="yb-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
        </div>
        {speaking ? (
          <>
            <label htmlFor="yb-org">Organization</label>
            <input id="yb-org" autoComplete="organization" value={organization} onChange={(event) => setOrganization(event.target.value)} />
            <div className="ed-grid">
              <div className="ed-w2">
                <label htmlFor="yb-date">Event date</label>
                <input id="yb-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </div>
              <div className="ed-w2">
                <label htmlFor="yb-location">Location or virtual</label>
                <input id="yb-location" value={location} onChange={(event) => setLocation(event.target.value)} />
              </div>
            </div>
            <label htmlFor="yb-audience">Audience & desired outcomes</label>
            <input id="yb-audience" value={audience} onChange={(event) => setAudience(event.target.value)} />
          </>
        ) : (
          <>
            <label htmlFor="yb-project">Company / project</label>
            <input id="yb-project" value={project} onChange={(event) => setProject(event.target.value)} />
            <div className="ed-grid">
              <div className="ed-w2">
                <label htmlFor="yb-challenge">Current challenge</label>
                <input id="yb-challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} />
              </div>
              <div className="ed-w2">
                <label htmlFor="yb-timing">Timing</label>
                <input id="yb-timing" value={timing} onChange={(event) => setTiming(event.target.value)} />
              </div>
            </div>
          </>
        )}
        <label htmlFor="yb-message">What are you working on?</label>
        <textarea id="yb-message" value={message} onChange={(event) => setMessage(event.target.value)} />
        {error && (
          <p className="ed-error" role="alert">
            {error}
          </p>
        )}
        <div className="ed-controls">
          <button className="ed-control" type="submit">
            Review inquiry
          </button>
        </div>
        <p role="status">{result}</p>
        <p>
          <Link to="/work">Back to Work with me</Link>
        </p>
      </form>
    </Shell>
  );
}
