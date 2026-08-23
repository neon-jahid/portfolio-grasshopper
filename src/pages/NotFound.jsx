import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ArrowLeftIcon, BugIcon } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { pageTransition } from '../lib/motion';
import { ui } from '../data/ui';

/** 404 page. */
export default function NotFound() {
  usePageMeta({ title: ui.notFound.metaTitle });

  return (
    <motion.div {...pageTransition}>
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-accent-soft text-accent">
          <BugIcon className="size-8" />
        </span>

        <p className="mt-8 font-mono text-sm text-accent">{ui.notFound.code}</p>

        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          {ui.notFound.heading}
        </h1>

        <p className="mt-4 max-w-md text-muted">
          {ui.notFound.body}
        </p>

        <Button to="/" className="mt-8">
          <ArrowLeftIcon className="size-4" />
          {ui.notFound.backHome}
        </Button>
      </Container>
    </motion.div>
  );
}
