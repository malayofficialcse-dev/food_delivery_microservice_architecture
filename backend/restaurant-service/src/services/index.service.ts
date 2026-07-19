import * as restaurantRepository from "../repositories/index.repository";
import type {
  CreateRestaurantDto,
  UpdateRestaurantDto,
} from "../dto/index.dto";
import { publishRestaurantEvent } from "../events/producer";

class RestaurantService {
  async createRestaurant(input: CreateRestaurantDto) {
    const existing = await restaurantRepository.getRestaurantByName(input.name);

    if (existing) {
      throw new Error("A restaurant with this name already exists.");
    }

    const restaurant = await restaurantRepository.createRestaurant(input);
    await publishRestaurantEvent("restaurant.events", {
      event: "restaurant.created",
      data: restaurant,
    });

    return restaurant;
  }

  async getRestaurants(query: { q?: string; city?: string; limit?: number; offset?: number }) {
    const limit = query.limit ?? 50;
    const offset = query.offset ?? 0;

    if (query.q || query.city) {
      return restaurantRepository.searchRestaurants(query.q ?? "", query.city, limit, offset);
    }

    return restaurantRepository.getRestaurants(limit, offset);
  }

  async getRestaurantById(id: string) {
    const restaurant = await restaurantRepository.getRestaurantById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }
    return restaurant;
  }

  async updateRestaurant(id: string, updateData: UpdateRestaurantDto) {
    const restaurant = await restaurantRepository.updateRestaurant(id, updateData);

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    await publishRestaurantEvent("restaurant.events", {
      event: "restaurant.updated",
      data: restaurant,
    });

    return restaurant;
  }

  async deleteRestaurant(id: string) {
    await restaurantRepository.deleteRestaurant(id);
    await publishRestaurantEvent("restaurant.events", {
      event: "restaurant.deleted",
      data: { id },
    });
  }
}

export default new RestaurantService();
