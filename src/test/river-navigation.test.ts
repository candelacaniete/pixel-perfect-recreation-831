import { describe, expect, it } from "vitest";
import { riverTarget, riverFrame, project, curve, curveD } from "@/components/safari/river/world";
import { assetUrl } from "@/lib/asset-url";

describe("River navigation", () => {
  it("continues downstream after each guardian rather than selecting it again", () => {
    expect(riverTarget([])).toEqual({ index: 0, z: 46 });
    expect(riverTarget([0])).toEqual({ index: 1, z: 96 });
    expect(riverTarget([0, 1])).toEqual({ index: 2, z: 146 });
    expect(riverTarget([0, 1, 2])).toEqual({ index: 3, z: 196 });
    expect(riverTarget([0, 1, 2, 3])).toEqual({ index: 4, z: 246 });
    expect(riverTarget([0, 1, 2, 3, 4])).toEqual({ index: -1, z: 296 });
  });

  it("keeps the near river center under the bow on a phone", () => {
    const { F, hy } = riverFrame(393, 844);
    for (const z of [46, 96, 146, 196, 246]) {
      const p = project({ z, W: 393, H: 844, F, hy, c0: curve(z), d0: curveD(z), sway: 0, pan: 0 }, curve(z + 1), 0, z + 1);
      expect(p?.x).toBeGreaterThan(180);
      expect(p?.x).toBeLessThan(213);
    }
  });
});

it("resolves photos to a public image address on hosts without Lovable's asset handler", () => {
  expect(assetUrl({ url: "/__l5e/assets-v1/8db4a633-5a6d-4ce5-8fc9-c4b950531d63/yrmis.jpg" })).toBe("https://pixel-perfect-recreation-831.lovable.app/__l5e/assets-v1/8db4a633-5a6d-4ce5-8fc9-c4b950531d63/yrmis.jpg");
  expect(assetUrl({ url: "/assets/puma.png" })).toBe("/assets/puma.png");
});