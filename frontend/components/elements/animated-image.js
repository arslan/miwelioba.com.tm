import { motion, useTransform, useScroll } from 'framer-motion';
import NextImage from './image';

export default function AnimatedImage({ media, speed, className }) {
  const { scrollYProgress } = useScroll();
  const yValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 100 * speed, 200 * speed]
  );

  return (
    <motion.div style={{ y: yValue }} className={className}>
      <NextImage media={media} alt="Background image" />
    </motion.div>
  );
}
