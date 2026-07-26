import type { Request, Response } from "express";
import * as service from "../services/index.service";
import { createUserSchema, updateUserSchema } from "../dto/index.dto";
const handle = (res: Response, error: unknown) => { const message = (error as Error).message; res.status(message === "User not found" ? 404 : 400).json({ success: false, message }); };
export const createUser = async (req: Request, res: Response) => { try { res.status(201).json({ success: true, data: await service.createUser(createUserSchema.parse(req.body)) }); } catch (e) { handle(res, e); } };
export const getUsers = async (_req: Request, res: Response) => { res.json({ success: true, data: await service.getUsers() }); };
export const getUser = async (req: Request, res: Response) => { try { res.json({ success: true, data: await service.getUser(String(req.params.id)) }); } catch (e) { handle(res, e); } };
export const updateUser = async (req: Request, res: Response) => { try { res.json({ success: true, data: await service.updateUser(String(req.params.id), updateUserSchema.parse(req.body)) }); } catch (e) { handle(res, e); } };
export const deleteUser = async (req: Request, res: Response) => { try { await service.deleteUser(String(req.params.id)); res.json({ success: true }); } catch (e) { handle(res, e); } };
