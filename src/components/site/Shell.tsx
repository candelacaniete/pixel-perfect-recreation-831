import type { ReactNode } from "react";
import { NextStops, SiteChrome } from "@/components/safari/SiteChrome";
import "@/components/editorial/editorial.css";
import "@/components/editorial/reference.css";

export function Shell({
  children,
  tone = "night",
  current,
}: {
  children: ReactNode;
  tone?: "night" | "paper" | "scarlet";
  current?: string;
}) {
  return (
    <>
      <SiteChrome />
      {children}
      <NextStops tone={tone} {...(current ? { current } : {})} />
    </>
  );
}
