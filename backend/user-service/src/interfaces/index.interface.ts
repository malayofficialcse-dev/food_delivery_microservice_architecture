export interface User { id: string; name: string; email: string; phone: string; userName: string; role: string; createdAt: Date; updatedAt: Date; }
export interface CreateUser { name: string; email: string; phone?: string; userName: string; password: string; role?: string; }
export interface UpdateUser { name?: string; email?: string; phone?: string; userName?: string; role?: string; }
