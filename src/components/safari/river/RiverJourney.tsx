import { useCallback, useEffect, useRef, useState } from "react";
import { stops, LANDING_Z, ambientLines } from "@/content/journey";
import { curve, curveD, width, project, hash, palette, rgb, type Cam } from "./world";
import { journey, useJourney } from "../journeyStore";
import { useReducedMotion } from "../visited";
import { EncounterLayer, type Phase } from "./EncounterLayer";
import { Landing } from "./Landing";

import capyImg from "@/assets/sp-capybara.webp";
import birdImg from "@/assets/sp-bird.webp";
import treeImg from "@/assets/sp-tree.webp";
import palmImg from "@/assets/sp-palm.webp";
import grassImg from "@/assets/sp-grass.webp";
import flowerImg from "@/assets/sp-flower.webp";
import heronImg from "@/assets/g-heron.webp";
import anaImg from "@/assets/g-anaconda.webp";
import mechImg from "@/assets/g-capymech.webp";
import macawImg from "@/assets/g-macaw.webp";
import jabiruImg from "@/assets/g-jabiru.webp";

const SRC = { capy: capyImg, bird: birdImg, tree: treeImg, palm: palmImg, grass: grassImg, flower: flowerImg, heron: heronImg, anaconda: anaImg, capymech: mechImg, macaw: macawImg, jabiru: jabiruImg };
type Key = keyof typeof SRC;

type Obj = { k: Key; x: number; z: number; h: number; y?: number; flip?: boolean; kind?: "capy" | "bird" | "gum" | "flower" | "tree" | undefined; side: number; seed: number };

const GUARD_H: Record<string, number> = { heron: 3.4, anaconda: 3.6, capymech: 2.4, macaw: 2.6, jabiru: 3.8 };

function buildWorld(): Obj[] {
  const o: Obj[] = [];
  let n = 0;
  for (let z = 3; z < LANDING_Z + 30; z += 1.5) {
    for (const side of [-1, 1]) {
      n++;
      const r = hash(n), w = width(z), c = curve(z);
      if (r < 0.62) o.push({ k: "grass", x: c + side * (w + 0.2 + hash(n + 5) * 1.2), z: z + hash(n + 9), h: 1.4 + hash(n + 2) * 1.2, side, seed: n, flip: hash(n + 3) > 0.5 });
      if (hash(n + 11) < 0.3) {
        const tree = hash(n + 13) < 0.45 ? "tree" : "palm";
        o.push({ k: tree, x: c + side * (w + 2.5 + hash(n + 7) * 10), z: z + hash(n + 17) * 1.5, h: tree === "tree" ? 6 + hash(n) * 4 : 8 + hash(n + 1) * 4, side, seed: n, kind: tree === "tree" ? "tree" : undefined, flip: hash(n + 4) > 0.5 });
      }
      if (hash(n + 21) < 0.035 && z > 60) o.push({ k: "flower", x: c + side * (w + 1.2), z, h: 3.4, side, seed: n, kind: "flower" });
    }
  }
  for (const [i, z] of [16, 21, 34, 62, 118, 172, 224, 268].entries()) {
    const side = i % 2 ? 1 : -1;
    o.push({ k: "capy", x: curve(z) + side * (width(z) + 0.1), z, h: 0.95, side, seed: i, kind: "capy", flip: side > 0 });
  }
  o.push({ k: "capy", x: curve(28) - (width(28) + 0.4), z: 28, h: 1.1, side: -1, seed: 99, kind: "gum" });
  for (const [i, z] of [12, 40, 74, 112, 164, 214, 258, 280].entries()) {
    const side = i % 2 ? 1 : -1;
    o.push({ k: "bird", x: curve(z) - side * width(z), z, h: 0.9, y: 0.4, side, seed: i, kind: "bird", flip: side < 0 });
  }
  stops.forEach((s, i) => {
    const gz = s.z + 9;
    o.push({ k: s.sprite, x: curve(gz) + s.side * (width(gz) + 0.5), z: gz, h: GUARD_H[s.sprite] ?? 3, side: s.side, seed: 500 + i, flip: s.side > 0 });
  });
  return o;
}

export function RiverJourney() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const j = useJourney();
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("dialogue");
  const [caption, setCaption] = useState<{ text: string; cite?: string } | null>(null);
  const [nearLine, setNearLine] = useState<string | null>(null);
  const [hint, setHint] = useState(true);
  const [fade, setFade] = useState(false);

  // mutable sim state
  const sim = useRef({ cam: j.cam, vel: 0, push: 0, logCleared: 0, fogSteps: 0, encounter: null as number | null, t: 0, world: [] as Obj[] });
  const imgs = useRef<Partial<Record<Key, HTMLImageElement>>>({});

  useEffect(() => {
    sim.current.world = buildWorld();
    (Object.keys(SRC) as Key[]).forEach((k) => { const im = new Image(); im.src = SRC[k]; imgs.current[k] = im; });
  }, []);

  // jumps from the map
  useEffect(() => {
    if (j.jump == null) return;
    const target = j.jump >= stops.length ? LANDING_Z : stops[j.jump]!.z;
    setFade(true);
    const id = setTimeout(() => {
      sim.current.cam = Math.max(0, target - 26);
      sim.current.vel = 6; sim.current.encounter = null;
      setActive(null);
      journey.set({ jump: null, landed: false });
      setFade(false);
    }, 350);
    return () => clearTimeout(id);
  }, [j.jump]);

  const depart = useCallback((completed: boolean) => {
    const i = sim.current.encounter;
    if (i == null) return;
    const s = journey.get();
    journey.set({ passed: [...new Set([...s.passed, i])], completed: completed ? [...new Set([...s.completed, i])] : s.completed });
    sim.current.encounter = null;
    sim.current.vel = 2.5;
    setActive(null);
  }, []);

  // input
  useEffect(() => {
    const el = canvas.current?.parentElement; if (!el) return;
    const kick = (v: number) => { sim.current.push += v; setHint(false); };
    const wheel = (e: WheelEvent) => { if ((e.target as HTMLElement).closest("[data-ui]")) return; e.preventDefault(); kick(e.deltaY * 0.012); };
    let ty = 0;
    const ts = (e: TouchEvent) => { ty = e.touches[0]?.clientY ?? 0; };
    const tm = (e: TouchEvent) => { if ((e.target as HTMLElement).closest("[data-ui]")) return; const y = e.touches[0]?.clientY ?? 0; kick((ty - y) * 0.04); ty = y; e.preventDefault(); };
    const keys = new Set<string>();
    const kd = (e: KeyboardEvent) => { if (["ArrowUp", "ArrowDown", "w", "s"].includes(e.key)) { keys.add(e.key); e.preventDefault(); setHint(false); } };
    const ku = (e: KeyboardEvent) => keys.delete(e.key);
    const kt = setInterval(() => { if (keys.has("ArrowUp") || keys.has("w")) sim.current.push += 0.35; if (keys.has("ArrowDown") || keys.has("s")) sim.current.push -= 0.35; }, 30);
    el.addEventListener("wheel", wheel, { passive: false });
    el.addEventListener("touchstart", ts, { passive: true });
    el.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);
    return () => { el.removeEventListener("wheel", wheel); el.removeEventListener("touchstart", ts); el.removeEventListener("touchmove", tm); window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); clearInterval(kt); };
  }, []);

  // main loop
  useEffect(() => {
    const cv = canvas.current!; const ctx = cv.getContext("2d")!;
    let raf = 0, last = performance.now();
    let lastCaption = "", lastNear = "";

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const S = sim.current; S.t += dt;
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const W = cv.clientWidth, H = cv.clientHeight;
      if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // --- movement ---
      const st = journey.get();
      if (S.encounter == null && !st.landed) {
        const base = reduced ? 0 : 1.5;
        const next = stops.findIndex((s, i) => !st.passed.includes(i) && s.z >= S.cam - 0.01);
        const targetZ = next >= 0 ? stops[next]!.z : LANDING_Z;
        const D = targetZ - S.cam;
        S.vel += S.push; S.push = 0;
        S.vel += (base - S.vel) * Math.min(1, dt * 0.9);
        let maxV = D < 22 ? Math.max(0.35, (D / 22) * 6) : 40;
        if (S.vel > maxV) S.vel = maxV;
        S.vel = Math.max(-8, S.vel);
        S.cam = Math.max(0, S.cam + S.vel * dt);
        if (S.cam >= targetZ - 0.05) {
          S.cam = targetZ; S.vel = 0;
          if (next >= 0) { S.encounter = next; setActive(next); setPhase("dialogue"); }
          else journey.set({ landed: true });
        }
      } else { S.push = 0; S.vel *= 0.9; }
      journey.get().cam !== S.cam && (st.cam = S.cam);

      const t = S.cam / LANDING_Z;
      const pal = palette(t);
      const sway = reduced ? 0 : Math.sin(S.t * 0.6) * 0.12;
      const F = Math.max(H * 0.9, W * 0.55);
      const cam: Cam = { z: S.cam, W, H, F, hy: H * 0.42 + (reduced ? 0 : Math.sin(S.t * 1.3) * 2), c0: curve(S.cam), d0: curveD(S.cam), sway };

      // --- sky ---
      const sky = ctx.createLinearGradient(0, 0, 0, cam.hy);
      sky.addColorStop(0, rgb(pal.top)); sky.addColorStop(1, rgb(pal.bot));
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, cam.hy + 2);
      if (pal.night > 0) {
        for (let i = 0; i < 90; i++) {
          const sx = ((hash(i) * W * 1.6 - cam.d0 * F * 0.4) % (W * 1.6) + W * 1.6) % (W * 1.6) - W * 0.3;
          ctx.fillStyle = `rgba(255,248,220,${pal.night * (0.4 + 0.6 * Math.abs(Math.sin(S.t * (0.5 + hash(i + 3)) + i)))})`;
          ctx.fillRect(sx, hash(i + 7) * cam.hy * 0.8, 1.6, 1.6);
        }
      }
      // sun/moon
      const orbY = cam.hy - (t > 0.75 ? (t - 0.75) * 4 * cam.hy * 0.35 : 0) - 10;
      const orb = ctx.createRadialGradient(W * 0.62, orbY, 0, W * 0.62, orbY, 90);
      orb.addColorStop(0, t > 0.75 ? "rgba(255,214,140,0.95)" : "rgba(240,236,255,0.55)"); orb.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = orb; ctx.fillRect(W * 0.62 - 90, orbY - 90, 180, 180);
      // distant tree line
      ctx.fillStyle = rgb(pal.land.map((v) => v * 0.8) as never, 1);
      ctx.beginPath(); ctx.moveTo(0, cam.hy);
      const off = cam.c0 * 30 + cam.d0 * F * 0.6 + S.cam * 2;
      for (let x = 0; x <= W; x += 8) {
        const u = (x + off) * 0.01;
        const hgt = 6 + 5 * Math.sin(u) + 4 * Math.sin(u * 2.7 + 1) + (Math.sin(u * 0.37) > 0.7 ? 18 * (Math.sin(u * 0.37) - 0.7) * 3 : 0);
        ctx.lineTo(x, cam.hy - hgt);
      }
      ctx.lineTo(W, cam.hy); ctx.fill();

      // --- land + river ---
      ctx.fillStyle = rgb(pal.land); ctx.fillRect(0, cam.hy, W, H - cam.hy);
      const L: { x: number; y: number }[] = [], R: { x: number; y: number }[] = [];
      for (let d = 70; d >= 0.3; d *= 0.93) {
        const z = S.cam + d, c = curve(z), w = width(z);
        const a = project(cam, c - w, 0, z), b = project(cam, c + w, 0, z);
        if (a && b) { L.push(a); R.push(b); }
      }
      if (L.length) {
        const wg = ctx.createLinearGradient(0, cam.hy, 0, H);
        wg.addColorStop(0, rgb(pal.bot, 1)); wg.addColorStop(0.35, rgb(pal.top.map((v, i) => (v + pal.bot[i]!) / 2) as never)); wg.addColorStop(1, rgb(pal.top.map((v) => v * 0.6) as never));
        ctx.fillStyle = wg;
        ctx.beginPath(); ctx.moveTo(L[0]!.x, L[0]!.y);
        L.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.lineTo(L[L.length - 1]!.x - W, H + 50); ctx.lineTo(R[R.length - 1]!.x + W, H + 50);
        for (let i = R.length - 1; i >= 0; i--) ctx.lineTo(R[i]!.x, R[i]!.y);
        ctx.fill();
        // bank foam lines
        ctx.strokeStyle = rgb(pal.bot, 0.35); ctx.lineWidth = 1.5;
        for (const side of [L, R]) { ctx.beginPath(); side.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke(); }
      }
      // reflected orb
      ctx.fillStyle = t > 0.75 ? "rgba(255,210,150,0.25)" : "rgba(230,230,255,0.12)";
      for (let i = 0; i < 6; i++) ctx.fillRect(W * 0.62 - 30 + Math.sin(S.t * 2 + i) * 8, cam.hy + 6 + i * 9, 60 - i * 6, 2);

      // water streaks + floating leaves flowing toward the viewer
      const flow = reduced ? 0 : S.t * 0.8;
      for (let k = 0; k < 160; k++) {
        const step = 0.45;
        const zz = Math.floor(S.cam / step) * step + k * step - (flow % step);
        const d = zz - S.cam; if (d < 0.4 || d > 60) continue;
        const idx = Math.round(zz / step);
        const w = width(zz), x = curve(zz) + (hash(idx) * 2 - 1) * w * 0.9;
        const p = project(cam, x, 0, zz); if (!p) continue;
        const leaf = hash(idx + 33) < 0.07;
        if (leaf) {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(hash(idx) * 6 + S.t * 0.3);
          ctx.fillStyle = hash(idx + 1) > 0.5 ? "rgba(240,190,70,0.9)" : "rgba(240,130,170,0.9)";
          ctx.beginPath(); ctx.ellipse(0, 0, 0.16 * p.s, 0.07 * p.s, 0, 0, 7); ctx.fill(); ctx.restore();
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(0.35, 4 / d) * (0.5 + 0.5 * Math.sin(S.t * 2 + idx))})`;
          ctx.lineWidth = Math.max(0.5, 0.025 * p.s);
          ctx.beginPath(); ctx.ellipse(p.x, p.y, 0.4 * p.s, 0.04 * p.s, 0, Math.PI, 0); ctx.stroke();
        }
      }

      // fallen trunk (Ingenuity)
      const ing = stops[2]!;
      if (S.logCleared < 1) {
        if (S.logCleared > 0) S.logCleared = Math.min(1, S.logCleared + dt * 0.4);
        const lz = ing.z + 3.2, w = width(lz), c = curve(lz) + S.logCleared * w * 1.6;
        const a = project(cam, c - w - 0.6, 0.15, lz), b = project(cam, c + w + 0.6, 0.15 + S.logCleared, lz);
        if (a && b) { ctx.strokeStyle = "rgba(92,62,40,1)"; ctx.lineCap = "round"; ctx.lineWidth = 0.45 * a.s; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.strokeStyle = "rgba(140,100,60,1)"; ctx.lineWidth = 0.12 * a.s; ctx.stroke(); }
      }

      // --- sprites ---
      const draw: { d: number; fn: () => void; guardian?: boolean }[] = [];
      for (const o of S.world) {
        const d = o.z - S.cam; if (d < 0.35 || d > 75) continue;
        let x = o.x, y = o.y ?? 0, alpha = Math.min(1, (75 - d) / 20), scaleX = 1, extra: (() => void) | null = null;
        if (o.kind === "capy" && d < 9) { const k = Math.min(1, (9 - d) / 4); x -= o.side * k * 0.8; y -= k * 0.9; alpha *= 1 - k; }
        if (o.kind === "bird" && d < 20 && !reduced) { const k = (20 - d) / 12; x += o.side * k * w2(o.z) * 2; y += k * k * 4; }
        if (o.kind === "tree") scaleX = 0.85 + 0.15 * Math.cos(S.t * 0.8 + o.seed);
        if (o.kind === "flower") scaleX = Math.min(1, 0.35 + Math.max(0, 30 - d) / 22);
        if (o.k in GUARD_H) { const close = Math.max(0, (16 - d) / 16); y += reduced ? 0 : Math.abs(Math.sin(S.t * 2.4)) * 0.12 * close; }
        const p = project(cam, x, y, o.z); if (!p) continue;
        const im = imgs.current[o.k]; if (!im?.complete || !im.naturalWidth) continue;
        const hpx = o.h * p.s, wpx = hpx * (im.naturalWidth / im.naturalHeight) * scaleX;
        if (wpx > W * 4 || p.x + wpx < -W || p.x - wpx > W * 2) continue;
        if (o.kind === "gum") {
          const g = Math.max(0, 14 - d) / 14, rr = (0.35 + 0.25 * Math.sin(S.t * 1.6) + g * 0.6) * p.s;
          const by = p.y - hpx * 0.6 - g * g * 4 * p.s, bx = p.x + (o.side < 0 ? 1 : -1) * hpx * 0.55;
          extra = () => {
            if (g > 0.75) { const fim = imgs.current.flower; if (fim?.complete) { ctx.globalAlpha = (g - 0.75) * 4; ctx.drawImage(fim, bx - rr, by - rr, rr * 2, rr * 2); ctx.globalAlpha = 1; } }
            else { const gg = ctx.createRadialGradient(bx - rr * 0.3, by - rr * 0.3, rr * 0.1, bx, by, rr); gg.addColorStop(0, "rgba(255,220,235,0.95)"); gg.addColorStop(1, "rgba(245,120,170,0.85)"); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(bx, by, rr, 0, 7); ctx.fill(); }
          };
        }
        const isG = o.k in GUARD_H;
        draw.push({ d, guardian: isG, fn: () => {
          if (isG && d < 18) { const gl = ctx.createRadialGradient(p.x, p.y - hpx * 0.5, 0, p.x, p.y - hpx * 0.5, hpx * 0.8); gl.addColorStop(0, "rgba(255,220,150,0.35)"); gl.addColorStop(1, "rgba(255,220,150,0)"); ctx.fillStyle = gl; ctx.fillRect(p.x - hpx, p.y - hpx * 1.3, hpx * 2, hpx * 1.6); }
          ctx.globalAlpha = Math.max(0, alpha);
          ctx.save(); ctx.translate(p.x, p.y); if (o.flip) ctx.scale(-1, 1);
          ctx.drawImage(im, -wpx / 2, -hpx, wpx, hpx); ctx.restore();
          // reflection
          if (d < 40) { ctx.globalAlpha = Math.max(0, alpha) * 0.18; ctx.save(); ctx.translate(p.x, p.y); ctx.scale(o.flip ? -1 : 1, -0.6); ctx.drawImage(im, -wpx / 2, -hpx, wpx, hpx); ctx.restore(); }
          ctx.globalAlpha = 1; extra?.();
        } });
      }
      draw.sort((a, b) => b.d - a.d);
      // night wash on scenery, guardians drawn afterwards so they pop
      draw.filter((x) => !x.guardian).forEach((x) => x.fn());
      ctx.globalCompositeOperation = "multiply"; ctx.fillStyle = rgb(pal.wash); ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = "source-over";
      draw.filter((x) => x.guardian).forEach((x) => x.fn());

      // fireflies
      if (pal.night > 0.1) {
        for (let i = 0; i < 70; i++) {
          const z = S.cam + 2 + hash(i) * 30, x = curve(z) + (hash(i + 1) * 2 - 1) * 9 + Math.sin(S.t * 0.7 + i) * 0.4, y = 0.4 + hash(i + 2) * 2.6 + Math.sin(S.t + i) * 0.2;
          const p = project(cam, x, y, z); if (!p) continue;
          const a = pal.night * (0.3 + 0.7 * Math.abs(Math.sin(S.t * 1.5 + i * 1.7)));
          const r = Math.max(1.5, 0.05 * p.s);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4); g.addColorStop(0, `rgba(255,236,140,${a})`); g.addColorStop(1, "rgba(255,236,140,0)");
          ctx.fillStyle = g; ctx.fillRect(p.x - r * 4, p.y - r * 4, r * 8, r * 8);
        }
      }

      // mist / fog
      const kick = stops[4]!; const kd = Math.abs(S.cam - kick.z);
      const fog = 0.22 + (kd < 30 && !journey.get().completed.includes(4) ? (1 - kd / 30) * (0.6 - S.fogSteps * 0.2) : 0);
      const mg = ctx.createLinearGradient(0, cam.hy - 60, 0, cam.hy + 120);
      mg.addColorStop(0, "rgba(255,255,255,0)"); mg.addColorStop(0.5, rgb(pal.bot, fog)); mg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = mg; ctx.fillRect(0, cam.hy - 60, W, 180);
      if (fog > 0.3) { ctx.fillStyle = rgb(pal.bot, (fog - 0.3) * 0.9); ctx.fillRect(0, 0, W, H); }
      // vignette
      const vg = ctx.createRadialGradient(W / 2, H * 0.5, Math.min(W, H) * 0.35, W / 2, H * 0.5, Math.max(W, H) * 0.75);
      vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

      // guardian anchor for floating speech
      const look = S.encounter ?? stops.findIndex((s) => s.z + 9 - S.cam > 0 && s.z + 9 - S.cam < 18);
      if (look >= 0 && anchor.current) {
        const s = stops[look]!, gz = s.z + 9;
        const p = project(cam, curve(gz) + s.side * (width(gz) + 0.5), (GUARD_H[s.sprite] ?? 3) + 0.2, gz);
        if (p) { anchor.current.style.left = `${Math.min(W - Math.min(220, W * 0.45), Math.max(Math.min(220, W * 0.45), p.x))}px`; anchor.current.style.top = `${Math.min(H * 0.6, Math.max(170, p.y))}px`;  }
      }
      const nl = S.encounter == null && look >= 0 ? stops[look]!.recognition : "";
      if (nl !== lastNear) { lastNear = nl; setNearLine(nl || null); }
      const amb = ambientLines.find((a) => S.cam >= a.z && S.cam < a.z + 13);
      const at = amb?.text ?? "";
      if (at !== lastCaption) { lastCaption = at; setCaption(amb ?? null); }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const stop = active != null ? stops[active]! : null;

  return (
    <div className="fixed inset-0 overflow-hidden bg-night text-paper select-none touch-none" aria-label="A first-person boat journey down a river">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* bow of the boat */}
      <svg aria-hidden viewBox="0 0 400 160" className={`pointer-events-none absolute bottom-[-8px] left-1/2 w-[min(90vw,560px)] -translate-x-1/2 ${reduced ? "" : "animate-bob"}`}>
        <path d="M200 6 C 260 40, 330 110, 400 160 L 0 160 C 70 110, 140 40, 200 6 Z" fill="var(--bow)" />
        <path d="M200 6 C 240 50, 290 110, 340 160 L 60 160 C 110 110, 160 50, 200 6 Z" fill="var(--bow-inner)" />
        <path d="M200 6 L 200 160" stroke="var(--bow)" strokeWidth="6" />
        <path d="M120 120 C 160 112, 240 112, 280 120" stroke="var(--bow)" strokeWidth="8" fill="none" />
      </svg>

      {/* floating text anchored to the nearest guardian */}
      <div ref={anchor} className="pointer-events-none absolute z-10" style={{ left: -999, top: -999 }}>
        {nearLine && !stop && (
          <p className="speech -translate-x-1/2 -translate-y-full animate-in fade-in duration-700">{nearLine}</p>
        )}
        {stop && (
          <EncounterLayer
            key={active}
            stop={stop}
            phase={phase}
            setPhase={setPhase}
            onDepart={depart}
            onClearLog={() => { sim.current.logCleared = 0.01; }}
            onFog={(n) => { sim.current.fogSteps = n; }}
          />
        )}
      </div>

      {caption && !stop && (
        <figure key={caption.text} className="pointer-events-none absolute inset-x-0 top-[18%] mx-auto max-w-xl px-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-1000">
          <blockquote className="font-display text-xl italic leading-snug text-paper text-shadow-river md:text-3xl">“{caption.text}”</blockquote>
          {caption.cite && <figcaption className="eyebrow mt-3 text-gold">— {caption.cite}</figcaption>}
        </figure>
      )}

      {hint && !stop && (
        <p className="eyebrow pointer-events-none absolute inset-x-0 bottom-28 text-center text-paper/80 animate-pulse">Scroll, swipe or hold ↑ to row · the river carries you anyway</p>
      )}

      {!stop && !j.landed && (
        <button data-ui onPointerDown={() => { sim.current.push += 3; setHint(false); }} className="row-btn absolute bottom-6 right-5 z-20" aria-label="Row forward">
          Row ↑
        </button>
      )}

      {j.landed && <Landing />}
      <div aria-hidden className={`pointer-events-none absolute inset-0 bg-night transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

const w2 = (z: number) => width(z);

