/**
 * The page backdrop: soft colour glows behind everything, finished with a
 * film-grain overlay.
 *
 * Fixed and non-interactive, so it stays put while the page scrolls and never
 * intercepts a click. Sits at `-z-10`, below all content; the body colour
 * paints behind it.
 *
 * The glows are the most expensive thing on the page to draw — a blur radius
 * this wide costs roughly the blurred area, and a phone GPU feels it. So they
 * are smaller and less blurred below `lg`, the third one is desktop-only, and
 * the drift only runs from `lg` up. A phone gets three static layers the
 * compositor rasterises once; a laptop gets the full thing.
 *
 * All colours come from the `--color-glow-*` tokens in index.css, and the
 * drift keyframes are disabled again under `prefers-reduced-motion`.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-[20%] -left-[15%] size-[26rem] rounded-full bg-glow-1/25 blur-[80px] lg:size-[45rem] lg:blur-[150px] lg:animate-[drift-a_26s_ease-in-out_infinite]" />

      <div className="absolute top-[22%] -right-[18%] size-[24rem] rounded-full bg-glow-2/20 blur-[80px] lg:size-[40rem] lg:blur-[160px] lg:animate-[drift-b_32s_ease-in-out_infinite]" />

      <div className="absolute -bottom-[15%] left-[25%] hidden size-[38rem] rounded-full bg-glow-3/15 blur-[150px] lg:block lg:animate-[drift-c_38s_ease-in-out_infinite]" />

      {/* Grain sits on top of the glows, under the content. */}
      <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay dark:opacity-[0.07]" />
    </div>
  );
}
