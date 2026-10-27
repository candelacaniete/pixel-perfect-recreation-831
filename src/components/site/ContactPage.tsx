import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Shell } from "@/components/site/Shell";
import { markVisited } from "@/components/safari/visited";
import { inquiryFromSearch, inquiryTypes, publishedEmail, siteCopy, type InquiryType } from "@/content/yrmis";
import { inquiryMessage, validateInquiry, type InquiryFields } from "@/lib/inquiry";
import { supabase } from "@/integrations/supabase/client";

const empty = {
  name: "",
  email: "",
  message: "",
  organization: "",
  date: "",
  location: "",
  audience: "",
  project: "",
  challenge: "",
  timing: "",
  outlet: "",
  deadline: "",
};

export function ContactPage({ interest }: { interest: InquiryType }) {
  const navigate = useNavigate();
  useEffect(() => markVisited("contact"), []);
  const [fields, setFields] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFields, string>>>({});
  const [result, setResult] = useState("");
  const [pending, setPending] = useState(false);
  const set = (key: keyof typeof empty) => (event: { target: { value: string } }) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
  };
  const speaking = interest === "Speaking";
  const press = interest === "Press";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { interest, ...fields };
    const found = validateInquiry(next);
    setErrors(found);
    setResult("");
    if (Object.keys(found).length) return;
    setPending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: fields.name.trim(),
      email: fields.email.trim(),
      interest,
      message: inquiryMessage(next),
    });
    setPending(false);
    if (error) {
      setResult(`The inquiry did not go through. Write to ${publishedEmail}.`);
      return;
    }
    setFields(empty);
    setResult(`Sent. ${interest} is with Yrmis. You can also write to ${publishedEmail}.`);
  }

  return (
    <Shell tone="paper" current="Contact">
      <main className="yw yw-plain">
        <section className="ll-pad">
          <p className="yw-kicker">Start a conversation</p>
          <h1 className="ll-display" style={{ marginTop: "0.6rem", maxWidth: "12ch" }}>Let’s make things happen.</h1>
          <p className="ll-lede">{siteCopy.conversation}</p>
          <p className="ll-lede">Or write directly to <a href={`mailto:${publishedEmail}`}>{publishedEmail}</a>.</p>
          <div className="ll-contact" style={{ marginTop: "2.5rem" }}>
            <form onSubmit={onSubmit} noValidate className="ll-form">
              <label>
                <span className="yw-kicker">Inquiry</span>
                <select className="ll-field" value={interest} onChange={(event) => { setResult(""); void navigate({ to: "/contact", search: { interest: inquiryFromSearch(event.target.value) }, replace: true }); }}>
                  {inquiryTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <Field label="Name" value={fields.name} onChange={set("name")} error={errors.name} autoComplete="name" />
              <Field label="Email" type="email" value={fields.email} onChange={set("email")} error={errors.email} autoComplete="email" />
              {speaking && (
                <>
                  <Field label="Organization" value={fields.organization} onChange={set("organization")} error={errors.organization} autoComplete="organization" />
                  <Field label="Event date" type="date" value={fields.date} onChange={set("date")} error={errors.date} />
                  <Field label="Location or virtual" value={fields.location} onChange={set("location")} error={errors.location} />
                  <Field label="Audience" value={fields.audience} onChange={set("audience")} error={errors.audience} />
                </>
              )}
              {press && (
                <>
                  <Field label="Publication or outlet" value={fields.outlet} onChange={set("outlet")} error={errors.outlet} />
                  <Field label="Deadline" value={fields.deadline} onChange={set("deadline")} error={errors.deadline} />
                </>
              )}
              {!speaking && !press && (
                <>
                  <Field label="Company / project" value={fields.project} onChange={set("project")} error={errors.project} />
                  <Field label="Current challenge" value={fields.challenge} onChange={set("challenge")} error={errors.challenge} />
                  <Field label="Timing" value={fields.timing} onChange={set("timing")} error={errors.timing} />
                </>
              )}
              <label>
                <span className="yw-kicker">What are you working on?</span>
                <textarea className="ll-field" rows={4} value={fields.message} onChange={set("message")} />
                {errors.message && <span role="alert" className="yw-field-error">{errors.message}</span>}
              </label>
              <button className="yw-pill" type="submit" disabled={pending}>{pending ? "Sending" : "Send the inquiry"}</button>
              <p className="ll-status" role="status">{result}</p>
            </form>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Field({ label, value, onChange, error, type = "text", autoComplete }: {
  label: string;
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  error?: string | undefined;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label>
      <span className="yw-kicker">{label}</span>
      <input className="ll-field" type={type} value={value} onChange={onChange} autoComplete={autoComplete} aria-invalid={error ? true : undefined} />
      {error && <span role="alert" className="yw-field-error">{error}</span>}
    </label>
  );
}
