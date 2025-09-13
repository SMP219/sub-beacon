import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ManageSubscription = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      {/* Back button */}
      <motion.button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-foreground/80 hover:text-primary font-medium transition-colors flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </motion.button>

      {/* Main container */}
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      >
        <Card className="glass-card p-8 border-2 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Manage Subscription
            </h1>
            
            <motion.div
              className="space-y-4 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg">
                🚧 This page is under construction
              </p>
              <p>
                Subscription management features will be implemented here during the hackathon development phase.
              </p>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full py-4 text-lg font-medium"
                size="lg"
              >
                Return to Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ManageSubscription;