import type { ReactNode } from "react";
import { NextStops, SiteChrome } from "@/components/safari/SiteChrome";

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
