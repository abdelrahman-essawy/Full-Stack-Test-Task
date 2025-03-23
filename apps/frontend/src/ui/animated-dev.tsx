import { motion, MotionProps } from 'framer-motion';

export const AnimatedDev = (props: MotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={'z-10 w-full bg-transparent'}
      {...props}
    >
      {props.children}
    </motion.div>
  );
};
