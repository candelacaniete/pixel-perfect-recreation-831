import type { ReactNode } from "react";
import { NextStops, SiteChrome } from "@/components/safari/SiteChrome";

export function Shell({
  children,
  tone = "night",
  current,
  bleed = false,
}: {
  children: ReactNode;
  tone?: "night" | "paper" | "scarlet" | "sunset" | "day";
  current?: string;
  bleed?: boolean;
}) {
  const page = (
    <>
      <SiteChrome />
      {children}
      <NextStops tone={tone} {...(current ? { current } : {})} />
    </>
  );
  return bleed ? <div className="site-bleed">{page}</div> : page;
}
