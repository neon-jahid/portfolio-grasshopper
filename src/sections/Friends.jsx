import { friends, friendsIntro } from '../data/friends';
import { Section } from '../components/ui/Section';
import { FriendCard } from '../components/ui/FriendCard';
import { Reveal } from '../components/ui/Reveal';
import { toBanglaDigits } from '../lib/utils';
import { ui } from '../data/ui';

/**
 * Friends: six portraits, who they are, and how long they have been around.
 *
 * A plain three-column grid rather than the bento layout the interests
 * section uses — every person here carries the same weight, and sizing one
 * card larger than the others would say something about the friendship that
 * the content does not.
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
        stagger={0.08}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {friends.map((friend) => (
          <Reveal.Item key={friend.id}>
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
