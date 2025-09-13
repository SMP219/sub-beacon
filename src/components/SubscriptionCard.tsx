import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Clock } from "lucide-react";

interface Subscription {
  planName: string;
  planPrice: number;
  planStatus: "active" | "inactive" | "expired" | "trial";
  startDate: string;
  lastBilledDate: string;
  lastRenewedDate: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
}

export const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "badge-active";
      case "expired":
        return "badge-expired";
      case "trial":
        return "badge-trial";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Plan header */}
      <div className="text-center space-y-3">
        <motion.h2
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {subscription.planName}
        </motion.h2>
        
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-3xl font-bold text-primary">
            ${subscription.planPrice}
          </span>
          <span className="text-muted-foreground">/month</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Badge className={`${getStatusVariant(subscription.planStatus)} px-4 py-2 text-sm font-medium`}>
            {subscription.planStatus.toUpperCase()}
          </Badge>
        </motion.div>
      </div>

      {/* Subscription details */}
      <motion.div
        className="space-y-4 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <Calendar size={16} className="text-primary" />
          <span className="font-medium">Started:</span>
          <span>{formatDate(subscription.startDate)}</span>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <CreditCard size={16} className="text-primary" />
          <span className="font-medium">Last Billed:</span>
          <span>{formatDate(subscription.lastBilledDate)}</span>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <Clock size={16} className="text-primary" />
          <span className="font-medium">Last Renewed:</span>
          <span>{formatDate(subscription.lastRenewedDate)}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};