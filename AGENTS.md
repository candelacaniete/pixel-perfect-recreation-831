<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All narrative copy lives in src/content/yrmis.ts; only use facts confirmed on the Yrmis reference sites — never invent biography or claims.
- Safari experience components live in src/components/safari; colors come from palette tokens in src/styles.css.
- The world map is the homepage; /click is the continuous canvas river journey and returns to the map when finished. Scene math lives in world.ts, guardian script in src/content/journey.ts, and boat progress in journeyStore.ts.
- Resolve managed photo pointers through src/lib/asset-url.ts using the public Lovable asset origin so photos also load on external hosts without a /__l5e handler.
