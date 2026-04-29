import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';

/**
 * Funcion para crear un nuevo videojuego e insertarlo en la bd
 * @param game - Juego que vamos a crear
 * @returns El juego insertado
 */
export async function createVideogame(game: GameDocumentInterface): Promise<GameDocumentInterface> {
    const new_game = new Game(game);
    try {
        const saved_game = await new_game.save();
        return saved_game;
    } catch (error) {
        throw new Error("Internal error");
    }
}