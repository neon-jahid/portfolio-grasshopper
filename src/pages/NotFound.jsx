import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ArrowLeftIcon, BugIcon } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { pageTransition } from '../lib/motion';

/** 404 page. */
export default function NotFound() {
  usePageMeta({ title: 'Page not found' });

  return (
    <motion.div {...pageTransition}>
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-accent-soft text-accent">
          <BugIcon className="size-8" />
        </span>

        <p className="mt-8 font-mono text-sm text-accent">Error 404</p>

        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          This page could not be reproduced
        </h1>

        <p className="mt-4 max-w-md text-muted">
          The address does not match anything on this site. It may have moved,
          or the link may be wrong.
        </p>

        <Button to="/" className="mt-8">
          <ArrowLeftIcon className="size-4" />
          Back to home
        </Button>
      </Container>
    </motion.div>
  );
}
