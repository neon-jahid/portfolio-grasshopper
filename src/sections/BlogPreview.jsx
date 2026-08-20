import { getRecentPosts } from '../lib/posts';
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
      eyebrow="writing"
      title="blog"
      description="Notes on testing, tooling and the parts of quality work that are not code."
    >
      <Reveal.Group className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post) => (
          <Reveal.Item key={post.slug}>
            <PostCard post={post} />
          </Reveal.Item>
        ))}
      </Reveal.Group>

      <Reveal className="mt-10 flex justify-center">
        <Button to="/blog" variant="outline">
          Read all posts
          <ArrowRightIcon className="size-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
