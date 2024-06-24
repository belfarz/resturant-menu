import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

const slideInVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const AnimatedRoute = ({ children }) => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <motion.div
      key={location.pathname}
      variants={slideInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {outlet || children}
    </motion.div>
  );
};

export default AnimatedRoute;
