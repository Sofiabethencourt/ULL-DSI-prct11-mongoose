import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';

export async function updateVideogame(id: string, videogame: GameDocumentInterface): Promise<GameDocumentInterface> {
    try {
        const game = await Game.findById(id);
        if (!game) {
            throw new Error ("No se ha encontrado ningun videojuego con ese id");
        }
        else {
            const updategame = await Game.findByIdAndUpdate(id, videogame, { new: true, runValidators: true })
            if (!updategame) {
                throw new Error ("No se ha podido actualizar el juego");
            }
            else {
                return updategame;
            }

        }
    }
    catch {
        throw new Error ("Internal error");
    }

}