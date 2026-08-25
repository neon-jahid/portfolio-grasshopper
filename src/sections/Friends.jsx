import { friends, friendsIntro } from '../data/friends';
import { Section } from '../components/ui/Section';
import { FriendCard } from '../components/ui/FriendCard';
import { Reveal } from '../components/ui/Reveal';
import { toBanglaDigits } from '../lib/utils';
import { ui } from '../data/ui';

/**
 * The width one card would take in a 2 / 3 / 4-column grid, worked out by
 * hand because flex has no `grid-cols` to do it: subtract this item's share
 * of the row's gaps from its share of the row. Two per row below `sm` at
 * `gap-4`, three from `sm` and four from `lg`, both at `gap-5`.
 *
 * The cap is what keeps one or two friends from rendering as billboards —
 * without it a lone card would stretch to the full container.
 */
const CARD_WIDTH = [
  'w-[calc(50%-0.5rem)]',
  'sm:w-[calc(33.333%-0.8334rem)]',
  'lg:w-[calc(25%-0.9375rem)]',
  'max-w-[18rem]',
].join(' ');

/**
 * Friends: who they are, and how long they have been around. The grid is
 * driven entirely by data/friends.js — adding a person is one entry there.
 *
 * An even wall rather than the bento layout the interests section uses —
 * every person here carries the same weight, and sizing one card larger than
 * the others would say something about the friendship that the content does
 * not. Four across from `lg`, so the tiles stay small enough to read as a
 * group of faces instead of a stack of profiles.
 *
 * Wrapping flex rather than a grid, because the number of people is not fixed
 * and will change. A `grid-cols-4` leaves a visible hole when the count is not
 * a multiple of four — three friends render as three-quarters of a row. Here
 * every card keeps the width it would have had in that grid, and a short row
 * centres itself instead, so five people look as deliberate as eight.
 *
 * Content lives in data/friends.js; the card's interaction lives in
 * components/ui/FriendCard.jsx.
 */
export function Friends() {
  if (friends.length === 0) return null;

  return (
    <Section
      id="friends"
      eyebrow={friendsIntro.eyebrow}
      title={friendsIntro.title}
      description={friendsIntro.description}
    >
      <Reveal.Group
        stagger={0.07}
        className="flex flex-wrap justify-center gap-4 sm:gap-5"
      >
        {friends.map((friend) => (
          <Reveal.Item key={friend.id} className={CARD_WIDTH}>
            <FriendCard friend={friend} />
          </Reveal.Item>
        ))}
      </Reveal.Group>

      <Reveal delay={0.15}>
        <p className="mt-8 font-mono text-xs text-faint">
          {ui.friends.total(toBanglaDigits(friends.length))}
        </p>
      </Reveal>
    </Section>
  );
}
