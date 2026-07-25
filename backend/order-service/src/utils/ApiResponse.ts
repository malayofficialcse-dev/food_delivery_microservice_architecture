export interface ApiResponse<T> { success: boolean; data?: T; message?: string; count?: number; }
export const successResponse = <T>(data:T,message?:string):ApiResponse<T> => ({success:true,data,message});
