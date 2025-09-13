import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <Loader2 size={48} className="text-primary" />
      </motion.div>
      
      <motion.h3
        className="text-lg font-semibold text-foreground mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Loading Your Subscription
      </motion.h3>
      
      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Please wait while we fetch your subscription details...
      </motion.p>
    </motion.div>
  );
};