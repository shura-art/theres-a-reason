import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const show = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  };

  return { message, show };
}

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
