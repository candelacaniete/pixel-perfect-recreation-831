// Pure world math for the first-person river: river curve, width, projection, palettes.
import { stops, LANDING_Z } from "@/content/journey";

export const EYE = 1.25;

export const curve = (z: number) => 7 * Math.sin(z * 0.03) + 4 * Math.sin(z * 0.071 + 1);
export const curveD = (z: number) => 0.21 * Math.cos(z * 0.03) + 0.284 * Math.cos(z * 0.071 + 1);
export const width = (z: number) => {
  let w = 5.6 + 1.6 * Math.sin(z * 0.05);
  for (const s of stops) w -= 2.2 * Math.exp(-(((z - s.z - 5) / 9) ** 2));
  w += 4 * Math.max(0, (z - (LANDING_Z - 20)) / 20); // river opens up before landing
  return Math.max(2.6, w);
};

export type Cam = { z: number; W: number; H: number; F: number; hy: number; c0: number; d0: number; sway: number };

export function project(cam: Cam, x: number, y: number, z: number) {
  const d = z - cam.z;
  if (d < 0.25) return null;
  const lx = x - (cam.c0 + cam.d0 * d * 0.92) + cam.sway;
  const s = cam.F / d;
  return { x: cam.W / 2 + lx * s, y: cam.hy + (EYE - y) * s, s, d };
}

// deterministic random
export const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

type RGB = [number, number, number];
const keys: { t: number; top: RGB; bot: RGB; land: RGB; wash: RGB }[] = [
  { t: 0.0, top: [44, 40, 86], bot: [218, 152, 146], land: [46, 54, 44], wash: [235, 200, 210] },
  { t: 0.14, top: [10, 14, 38], bot: [40, 46, 96], land: [14, 22, 26], wash: [120, 130, 185] },
  { t: 0.55, top: [18, 18, 56], bot: [84, 52, 120], land: [22, 20, 40], wash: [150, 125, 200] },
  { t: 0.8, top: [64, 60, 126], bot: [236, 140, 132], land: [50, 40, 58], wash: [225, 175, 195] },
  { t: 1.0, top: [118, 152, 214], bot: [255, 208, 152], land: [78, 98, 64], wash: [255, 240, 225] },
];
const mix = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
export const rgb = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

export function palette(t: number) {
  const tt = Math.min(1, Math.max(0, t));
  let i = 0;
  while (i < keys.length - 2 && tt > keys[i + 1]!.t) i++;
  const a = keys[i]!, b = keys[i + 1]!;
  const k = (tt - a.t) / (b.t - a.t);
  return { top: mix(a.top, b.top, k), bot: mix(a.bot, b.bot, k), land: mix(a.land, b.land, k), wash: mix(a.wash, b.wash, k), night: 1 - Math.abs(tt - 0.4) * 2.2 };
}
