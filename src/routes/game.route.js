import { Router } from "express";
import { RAWG_PREFIX } from "./rawg.route.js";
import { GameController } from "../controllers/game.controller.js";

export const gameRouter = Router(); 

gameRouter.post(RAWG_PREFIX + "/add-favorite", GameController.addGameToFavorite);
gameRouter.post(RAWG_PREFIX + "/remove-favorite", GameController.removeGameFromFavorite);
gameRouter.post(RAWG_PREFIX + "/check-favorite", GameController.checkFavorite);