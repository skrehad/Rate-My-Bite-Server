import { 
  ISubscriptionPlan, 
  ISubscriptionPaymentInitiate,
  ISubscriptionPlanDetails 
} from "./subscribe.interface";
import httpStatus from "http-status";
import { subscribeUtils } from "./subscribe.utils";
import { subscriptionPlans, calculateEndDate } from "../../utils/subscriptionPlans";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prismaProvider";

// Cancel premium subscription
const cancelSubscription = async (userId: string): Promise<{ success: boolean }> => {
  // Simply update user status to non-premium
  await prisma.user.update({
    where: { id: userId },
    data: {
      isPremium: false,
      role: "USER",
      premiumUntil: null
    }
  });

  return { success: true };
};

// Get subscription plans
const getSubscriptionPlans = (): ISubscriptionPlanDetails => {
  return subscriptionPlans;
};

// Check if user is subscribed
const checkUserSubscription = async (userId: string): Promise<{
  isSubscribed: boolean;
  premiumUntil: Date | null;
  role: string;
}> => {
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User ID is required");
  }

  // Check user's premium status directly
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isPremium: true, premiumUntil: true, role: true }
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return {
    isSubscribed: user.isPremium || false,
    premiumUntil: user.premiumUntil,
    role: user.role
  };
};

// Initiate subscription payment
const initiateSubscriptionPayment = async (payload: ISubscriptionPaymentInitiate): Promise<{ checkout_url: string, transactionId: string }> => {
  const { userId, plan, customerName, customerEmail, amount } = payload;
  
  // Create a transaction ID to track this payment
  const transactionId = `SUB_${Date.now()}_${userId.substring(0, 8)}`;
  
  // Prepare payment payload for Shurjopay
  const shurjopayPayload = {
    amount: amount,
    order_id: transactionId,
    currency: "BDT",
    customer_name: customerName,
    customer_email: customerEmail,
    client_ip: "127.0.0.1",
    customer_phone: "01783278214", 
    customer_city: "Pabna",
    customer_address: "Pabna, Bangladesh" 
  };

  // Make payment request to Shurjopay
  const paymentResponse = await subscribeUtils.makePaymentAsync(shurjopayPayload);
  
  if (!paymentResponse || !paymentResponse.checkout_url) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to initiate payment");
  }

  console.log("paymentResponse", paymentResponse);

  return {
    checkout_url: paymentResponse.checkout_url,
    transactionId: paymentResponse.sp_order_id
  };
};

// Verify subscription payment and update user to premium if successful
const verifySubscriptionPayment = async (orderId: string, userId: string): Promise<any> => {
  // Verify payment with Shurjopay
  const verificationResponse = await subscribeUtils.verifyPaymentAsync(orderId);
  
  if (verificationResponse?.length && verificationResponse[0].bank_status === 'Success') {
    const paymentInfo = verificationResponse[0];
    
    // Get transaction ID and extract user ID from it
    const transactionId = (paymentInfo as any).order_id || orderId;
    console.log("transactionId", transactionId);
    
    // Calculate subscription end date
    const plan: ISubscriptionPlan = "MONTHLY";
    const endDate = calculateEndDate(plan);
    console.log("endDate", endDate);
    
    // Simply update user to premium status
    await prisma.user.update({
      where: { id: userId },
      data: {
        isPremium: true,
        role: "PREMIUM",
        premiumUntil: endDate
      }
    });
  }
  
  return verificationResponse;
};

export const SubscriptionService = {
  cancelSubscription,
  getSubscriptionPlans,
  initiateSubscriptionPayment,
  verifySubscriptionPayment,
  checkUserSubscription
};
