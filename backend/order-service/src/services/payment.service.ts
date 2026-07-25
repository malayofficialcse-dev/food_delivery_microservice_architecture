import { paymentService } from "../config/axios";
import type { PaymentStatus } from "../interfaces/index.interface";
export const createPayment = async (input:{orderId:string;amount:number;method:string}):Promise<PaymentStatus> => {
  if (!process.env.PAYMENT_SERVICE_URL || input.method.toLowerCase() === "cod") return "Pending";
  try { const result=await paymentService.post("/payments",input); return result.data?.status === "paid" ? "Paid" : "Pending"; }
  catch { return "Failed"; }
};
