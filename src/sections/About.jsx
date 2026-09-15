import { motion } from 'framer-motion';
import { personal, profile } from '../data/site';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Portrait } from '../components/ui/Portrait';
import { Tag } from '../components/ui/Tag';
import { ArrowRightIcon, MapPinIcon } from '../components/icons';
import { fadeUp, staggerContainer, whenInView } from '../lib/motion';
import aboutPortrait from '../assets/about-portrait.webp';
import { ui } from '../data/ui';

/**
 * About: the personal half of the site.
 *
 * Deliberately the hero's mirror image — illustration on the *left*, copy on
 * the right. The hero already spends its width running left-to-right, so
 * repeating that arrangement one screen later made the two panels read as the
 * same slide twice. Flipping it gives the scroll somewhere to turn.
 *
 * On small screens the copy still comes first: a headline is a better landing
 * spot than a picture, and the illustration follows underneath (`lg:order-first`
 * only moves it once there are two columns to move it between).
 *
 * Content lives in `personal` in data/site.js.
 */
export function About() {
    return (
        <section
            id='about'
            aria-labelledby='about-title'
            className='relative overflow-hidden py-section'>
            <Container className='relative'>
                <div className='grid items-center gap-12 sm:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20'>
                    <Portrait
                        src={aboutPortrait}
                        alt={ui.about.portraitAlt}
                        ratio='wide'
                        side='left'
                        floatOffset={8}
                        className='mx-auto w-full max-w-lg lg:order-first'>
                        {/* Caption card, tucked into the corner nearest the copy. It
                overlaps the frame on purpose — the hero's portrait sits in a
                clean rectangle, this one breaks out of it. */}
                        <motion.figcaption
                            {...whenInView}
                            variants={fadeUp}
                            className='absolute -bottom-5 right-4 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:right-6'>
                            <span className='font-mono text-[0.7rem] tracking-[0.18em] text-accent uppercase'>{ui.about.captionLabel}</span>
                            <span className='mt-0.5 block text-sm text-muted'>{ui.about.caption}</span>
                        </motion.figcaption>
                    </Portrait>

                    <motion.div
                        {...whenInView}
                        variants={staggerContainer(0.1)}>
                        <motion.p
                            variants={fadeUp}
                            className='flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase'>
                            <span
                                aria-hidden='true'
                                className='h-px w-8 bg-accent/50'
                            />
                            {ui.about.eyebrow}
                        </motion.p>

                        <motion.h2
                            id='about-title'
                            variants={fadeUp}
                            className='mt-4 text-4xl font-semibold tracking-tight sm:text-5xl'>
                            {personal.headline.first}
                            <span className='mt-1 block text-gradient'>{personal.headline.second}</span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className='mt-6 max-w-xl border-l-2 border-accent/30 pl-5 text-xl text-muted'>
                            {personal.lead}
                        </motion.p>

                        {personal.paragraphs.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                variants={fadeUp}
                                className='mt-5 max-w-xl leading-relaxed text-muted'>
                                {paragraph}
                            </motion.p>
                        ))}

                        {personal.interests.length > 0 && (
                            <motion.ul
                                variants={fadeUp}
                                className='mt-8 flex flex-wrap gap-2'>
                                {personal.interests.map((interest) => (
                                    <li key={interest}>
                                        <Tag>{interest}</Tag>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
