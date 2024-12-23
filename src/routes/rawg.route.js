import { Router } from "express";
import { RawgController } from "../controllers/rawg.controller.js";

export const rawgRouter = Router();
export const RAWG_PREFIX = "/games"

rawgRouter.post(RAWG_PREFIX, RawgController.getGames);
rawgRouter.post(RAWG_PREFIX + "/preview", RawgController.getPreview);