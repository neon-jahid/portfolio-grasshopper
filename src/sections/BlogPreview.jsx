import { getRecentPosts } from '../lib/posts';
import { profile } from '../data/site';
import { ui } from '../data/ui';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { PostCard } from '../components/ui/PostCard';
import { Button } from '../components/ui/Button';
import { ArrowRightIcon } from '../components/icons';

/**
 * Home-page window onto the blog: the three newest posts plus a link to the
 * full archive. Renders nothing when there are no posts yet.
 */
export function BlogPreview() {
  const recentPosts = getRecentPosts(3);

  if (recentPosts.length === 0) return null;

  return (
    <Section
      id="blog"
      eyebrow={ui.blog.eyebrow}
      title={ui.blog.title}
      description={ui.blog.description}
    >
      <Reveal.Group className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post) => (
          <Reveal.Item key={post.slug}>
            <PostCard post={post} locale={profile.locale} />
          </Reveal.Item>
        ))}
      </Reveal.Group>

      <Reveal className="mt-10 flex justify-center">
        <Button to="/blog" variant="outline">
          {ui.blog.readAll}
          <ArrowRightIcon className="size-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
