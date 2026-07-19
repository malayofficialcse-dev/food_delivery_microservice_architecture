import type { Request, Response } from "express";
import restaurantService from "../services/index.service";
import { restaurantCreateSchema, restaurantUpdateSchema } from "../validators/index.validator";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const payload = restaurantCreateSchema.parse(req.body);
    const restaurant = await restaurantService.createRestaurant(payload);

    res.status(201).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantService.getRestaurants({
      q: req.query.q as string | undefined,
      city: req.query.city as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      offset: req.query.offset ? Number(req.query.offset) : undefined,
    });

    res.json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const payload = restaurantUpdateSchema.parse(req.body);
    const restaurant = await restaurantService.updateRestaurant(req.params.id, payload);

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    await restaurantService.deleteRestaurant(req.params.id);
    res.json({
      success: true,
      message: "Restaurant deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
