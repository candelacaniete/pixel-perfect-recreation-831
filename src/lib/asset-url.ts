/** Lovable serves managed assets here; external hosts do not implement /__l5e. */
const ASSET_ORIGIN = "https://pixel-perfect-recreation-831.lovable.app";

export function assetUrl(asset: { url: string }) {
  return asset.url.startsWith("/__l5e/assets-v1/")
    ? new URL(asset.url, ASSET_ORIGIN).href
    : asset.url;
}