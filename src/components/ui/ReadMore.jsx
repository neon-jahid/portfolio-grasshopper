import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '../icons';
import { EASE } from '../../lib/motion';
import { cn } from '../../lib/utils';

/** Text fades out over the last stretch of the clipped block. */
const FADE = 'linear-gradient(to bottom, #000 62%, transparent 100%)';

/**
 * Collapse a block of prose down to a few lines, with a toggle to open it.
 *
 * Long personal writing is worth keeping, but a wall of it stops the scroll
 * dead. This clips the block to `collapsedHeight` and fades the last lines
 * out, so the page reads as a summary until someone asks for the rest.
 *
 * Opening it does *not* let the block grow without limit: past
 * `expandedHeight` it becomes its own scroll area. A very long piece would
 * otherwise push everything after it — the interest chips, the next section —
 * most of a screen down the page, and the reader would lose the illustration
 * it sits beside.
 *
 * The collapsed fade is a `mask-image` rather than a gradient overlay on
 * purpose: the page background is a set of soft glows, and a solid gradient
 * painted on top of it would show its own edges. A mask fades the *text*
 * instead, whatever happens to be behind it. It is dropped once open, where it
 * would hide the last line at the end of the scroll.
 *
 * The content stays in the DOM while collapsed — search and Ctrl+F still find
 * it — and the button carries `aria-expanded`/`aria-controls` so assistive
 * tech is told what it opens.
 *
 * @param {object} props
 * @param {number} [props.collapsedHeight=200] clipped height, in px
 * @param {number} [props.expandedHeight=420]  height at which opening starts scrolling, in px
 * @param {string} props.moreLabel  label while collapsed
 * @param {string} props.lessLabel  label while open
 * @param {string} [props.scrollLabel] accessible name for the scroll area
 */
export function ReadMore({
  collapsedHeight = 200,
  expandedHeight = 420,
  moreLabel,
  lessLabel,
  scrollLabel,
  className,
  children,
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(null);
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const regionId = useId();

  // Measure rather than animate to `height: auto` — Framer can't tween to an
  // intrinsic value, and the text reflows on resize and on a font swap, so a
  // one-off measurement would go stale.
  //
  // `scrollHeight` is read off the inner wrapper, which is `flow-root`: without
  // a block formatting context the first paragraph's top margin collapses out
  // through the wrapper, the measurement comes up a margin short, and the
  // opened block clips its own last line.
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.target.scrollHeight);
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Before the first measurement, assume it overflows: the toggle appearing a
  // frame late is less jarring than one that flashes in and disappears.
  const overflows = contentHeight === null || contentHeight > collapsedHeight + 24;
  const clipped = overflows && !expanded;
  const scrolls = expanded && contentHeight !== null && contentHeight > expandedHeight;

  function toggle() {
    // Collapsing from halfway down the scroll would otherwise reopen there.
    if (expanded && viewportRef.current) viewportRef.current.scrollTop = 0;
    setExpanded((open) => !open);
  }

  return (
    <div className={className}>
      <motion.div
        id={regionId}
        ref={viewportRef}
        initial={false}
        animate={{
          height: clipped
            ? collapsedHeight
            : scrolls
              ? expandedHeight
              : (contentHeight ?? 'auto'),
        }}
        transition={{ duration: 0.5, ease: EASE }}
        // A scroll area has to be reachable by keyboard, or the text inside it
        // is unreachable for anyone not using a mouse.
        {...(scrolls
          ? { tabIndex: 0, role: 'region', 'aria-label': scrollLabel }
          : null)}
        className={cn(
          'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4',
          scrolls ? 'scroll-slim overflow-y-auto pr-4' : 'overflow-hidden',
        )}
        style={clipped ? { maskImage: FADE, WebkitMaskImage: FADE } : undefined}
      >
        <div ref={contentRef} className="flow-root">
          {children}
        </div>
      </motion.div>

      {overflows && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={regionId}
          className={cn(
            'mt-4 inline-flex items-center gap-1.5 rounded-full text-sm font-medium',
            'text-accent transition-colors duration-300 hover:text-ink',
          )}
        >
          {expanded ? lessLabel : moreLabel}
          <ChevronDownIcon
            className={cn(
              'size-4 transition-transform duration-300 ease-out',
              expanded && 'rotate-180',
            )}
          />
        </button>
      )}
    </div>
  );
}
