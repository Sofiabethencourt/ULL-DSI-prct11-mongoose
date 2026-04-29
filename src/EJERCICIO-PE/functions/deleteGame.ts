import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';

/**
 * Funcion para eliminar los videogjuegos por su id
 * @param id - Parámetro para encontrar el juego
 * @returns El juego eliminado
 */
export async function deleteGame(id: string): Promise<GameDocumentInterface> {
    try {
        const response = await Game.findByIdAndDelete(id);
        if (!response) {
            throw new Error ("No se ha encontrado un videojuego con ese id");
        }
        else {
            return response;
        }
    }
    catch {
        throw new Error ("Internal error");
    }
}