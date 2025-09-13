import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  const fetchUserSubscriptions = async () => {
    try {
      setLoading(true);
      setError(false);
      
      // TODO: Replace with actual API call
      // const token = localStorage.getItem('authToken');
      // const userId = localStorage.getItem('userId');
      // const response = await fetch(`/api/subscriptions?userId=${userId}`, {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      
      // Simulate API call for now
      setTimeout(() => {
        const shouldError = Math.random() > 0.8;
        
        if (shouldError) {
          setError(true);
        } else {
          // Mock multiple subscriptions data
          setSubscriptions([
            {
              id: 1,
              planName: "Premium Plus",
              planPrice: 15.99,
              planStatus: "active",
              startDate: "2025-01-10",
              lastBilledDate: "2025-09-01",
              lastRenewedDate: "2025-09-10",
            },
            {
              id: 2,
              planName: "Basic Plan",
              planPrice: 9.99,
              planStatus: "expired",
              startDate: "2024-06-15",
              lastBilledDate: "2025-08-15",
              lastRenewedDate: "2025-08-15",
            },
            {
              id: 3,
              planName: "Pro Workspace",
              planPrice: 25.99,
              planStatus: "trial",
              startDate: "2025-09-01",
              lastBilledDate: "N/A",
              lastRenewedDate: "N/A",
            }
          ]);
        }
        setLoading(false);
      }, 1200);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError(true);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // TODO: Clear auth tokens and redirect
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    console.log("Logged out!");
    setShowLogoutModal(false);
  };

  const handleManageSubscription = (subscriptionId) => {
    console.log(`Managing subscription ${subscriptionId}`);
    // TODO: Navigate to manage subscription page with subscription ID
    alert(`Navigate to manage subscription ${subscriptionId}`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "badge-active";
      case "expired":
        return "bg-red-500/80 text-white";
      case "trial":
        return "bg-yellow-500/80 text-white";
      default:
        return "bg-gray-500/80 text-white";
    }
  };

  const formatDate = (dateString) => {
    if (dateString === "N/A") return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen animated-bg p-4">
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          My Subscriptions
        </h1>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-foreground/80 hover:text-destructive font-medium transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
        >
          Logout
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSpinner key="loading" />
          ) : error ? (
            <ErrorDisplay key="error" onRetry={fetchUserSubscriptions} />
          ) : (
            <motion.div
              key="subscriptions"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {subscriptions.map((subscription, index) => (
                <motion.div
                  key={subscription.id}
                  className="glass-card card-hover p-6 rounded-2xl border-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {subscription.planName}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-primary">
                        ${subscription.planPrice}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${getStatusBadgeClass(
                        subscription.planStatus
                      )}`}
                    >
                      {subscription.planStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-3 text-sm text-muted-foreground mb-6">
                    <div className="flex justify-between">
                      <span>Started:</span>
                      <span className="text-foreground">{formatDate(subscription.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Billed:</span>
                      <span className="text-foreground">{formatDate(subscription.lastBilledDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Renewed:</span>
                      <span className="text-foreground">{formatDate(subscription.lastRenewedDate)}</span>
                    </div>
                  </div>

                  {/* Manage Button */}
                  <button
                    onClick={() => handleManageSubscription(subscription.id)}
                    className="btn-primary w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                  >
                    Manage Plan
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-2xl w-full max-w-sm border-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-destructive"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Confirm Logout
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Are you sure you want to log out of your account?
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Loading Component
const LoadingSpinner = () => (
  <motion.div
    className="flex flex-col items-center justify-center p-12 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="mb-4"
    >
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </motion.div>
    <h3 className="text-lg font-semibold text-foreground mb-2">
      Loading Your Subscriptions
    </h3>
    <p className="text-muted-foreground">
      Please wait while we fetch your subscription details...
    </p>
  </motion.div>
);

// Error Component
const ErrorDisplay = ({ onRetry }) => (
  <motion.div
    className="flex flex-col items-center justify-center p-12 text-center space-y-4"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
  >
    <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
      <svg
        className="w-8 h-8 text-destructive"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-foreground">
        Unable to Load Subscriptions
      </h3>
      <p className="text-muted-foreground max-w-sm">
        We couldn't retrieve your subscription details. Please check your connection and try again.
      </p>
    </div>

    <button
      onClick={onRetry}
      className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Try Again
    </button>
  </motion.div>
);