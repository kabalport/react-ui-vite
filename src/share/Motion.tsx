import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  classes: string;
};

export const DefaultMotion = ({ children, classes }: Props) => {
  return (
    <motion.div
      className={classes}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

export const DelayMotion = ({ children, classes }: Props) => {
  return (
    <motion.div
      className={classes}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};
