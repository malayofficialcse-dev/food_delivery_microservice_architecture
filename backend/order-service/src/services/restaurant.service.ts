import { restaurantService } from "../config/axios";
export const ensureRestaurantExists = async (id:string):Promise<void> => { try { const result=await restaurantService.get(`/restaurants/${id}`); if(!result.data?.data) throw new Error(); } catch { throw new Error(`Restaurant ${id} could not be found`); } };
