import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';

/**
 * Obtiene los juegos por su id
 * @param id - Parámetro de búsqueda
 * @returns El juego que tiene el id correspondiente
 */
export async function getGameById(id: string): Promise<GameDocumentInterface> {
    try {
        const game = await Game.findById(id);
        if (!game) {
            throw new Error ("No se ha encontrado ningun juego con ese id");
        }
        else {
            return game;
        }
    } catch {
        throw new Error ("Internal error");
    }
}