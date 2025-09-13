import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ErrorDisplay = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center space-y-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
      >
        <AlertCircle size={32} className="text-destructive" />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-foreground">
          Unable to Load Subscription
        </h3>
        <p className="text-muted-foreground max-w-sm">
          We couldn't retrieve your subscription details at the moment. Please check your connection and try again.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={handleRetry}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Try Again
        </Button>
      </motion.div>
    </motion.div>
  );
};