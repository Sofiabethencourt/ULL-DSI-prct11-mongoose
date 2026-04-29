import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';

export interface Filter {
    genre: string;
    platform: string;
}

/**
 * Función para obtener videojuegos por un filtro
 * @param filter - Filtro por genero y plataforma
 * @returns Los juegos filtrados
 */
export async function getVideogames(filter: Partial<Filter>): Promise<GameDocumentInterface[]> {
    try {
        const games = await Game.find(filter);
        if (games.length == 0) {
            throw new Error ("No se ha encontrado ningun juego con esas caracteristicas");
        }
        else {
            return games;
        }
    } catch {
        throw new Error ("Internal error");
    }
}
    