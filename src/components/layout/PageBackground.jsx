/**
 * The page backdrop: three soft colour glows drifting behind everything,
 * finished with a film-grain overlay.
 *
 * Fixed and non-interactive, so it stays put while the page scrolls and never
 * intercepts a click. Sits at `-z-10`, below all content; the body colour
 * paints behind it.
 *
 * All colours come from the `--color-glow-*` tokens in index.css, and the
 * drift keyframes are disabled automatically under `prefers-reduced-motion`.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-[15%] -top-[20%] size-[45rem] rounded-full bg-glow-1/25 blur-[150px] animate-[drift-a_26s_ease-in-out_infinite]" />

      <div className="absolute -right-[18%] top-[22%] size-[40rem] rounded-full bg-glow-2/20 blur-[160px] animate-[drift-b_32s_ease-in-out_infinite]" />

      <div className="absolute -bottom-[15%] left-[25%] size-[38rem] rounded-full bg-glow-3/15 blur-[150px] animate-[drift-c_38s_ease-in-out_infinite]" />

      {/* Grain sits on top of the glows, under the content. */}
      <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay dark:opacity-[0.07]" />
    </div>
  );
}
