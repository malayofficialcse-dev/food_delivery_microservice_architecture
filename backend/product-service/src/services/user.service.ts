import axios from "axios";
import { ENV } from "../config/env";

export const getUserById = async (userId:string) => {
    try {
        const response = await axios.get(
            `${ENV.USER_SERVICE_URL}/users/${userId}`
        );
        return response.data.data;
    } catch (error) {
        throw new Error ("Unable to fetch user");
    }
}
