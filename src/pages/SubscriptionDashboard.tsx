import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoutModal } from "@/components/LogoutModal";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorDisplay } from "@/components/ErrorDisplay";

interface Subscription {
  planName: string;
  planPrice: number;
  planStatus: "active" | "inactive" | "expired" | "trial";
  startDate: string;
  lastBilledDate: string;
  lastRenewedDate: string;
}

const SubscriptionDashboard = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch subscription data
    setTimeout(() => {
      setLoading(false);
      // Toggle between error and success for demo
      const shouldError = Math.random() > 0.7;
      
      if (shouldError) {
        setError(true);
      } else {
        setSubscription({
          planName: "Premium Plus",
          planPrice: 15.99,
          planStatus: "active",
          startDate: "2025-01-10",
          lastBilledDate: "2025-09-01",
          lastRenewedDate: "2025-09-10",
        });
      }
    }, 1200);
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logged out!");
    setShowLogoutModal(false);
    // Navigate to login page or clear auth state
  };

  const handleManageSubscription = () => {
    navigate("/manage-subscription");
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      {/* Header with logout button */}
      <motion.button
        onClick={() => setShowLogoutModal(true)}
        className="absolute top-6 right-6 text-foreground/80 hover:text-destructive font-medium transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Logout
      </motion.button>

      {/* Main subscription container */}
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      >
        <Card className="glass-card card-hover p-8 border-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Your Subscription
            </h1>

            <AnimatePresence mode="wait">
              {loading ? (
                <LoadingSpinner key="loading" />
              ) : error || !subscription ? (
                <ErrorDisplay key="error" />
              ) : (
                <SubscriptionCard key="subscription" subscription={subscription} />
              )}
            </AnimatePresence>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleManageSubscription}
                className="btn-primary w-full py-4 text-lg font-semibold"
                size="lg"
              >
                Manage Subscription
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default SubscriptionDashboard;