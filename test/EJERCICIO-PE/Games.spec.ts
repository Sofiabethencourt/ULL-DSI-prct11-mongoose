import {describe, test, expect, beforeEach} from 'vitest';
import {createVideogame} from '../../src/EJERCICIO-PE/functions/createGame.js';
import {getVideogames} from '../../src/EJERCICIO-PE/functions/getgames.js';
import {updateVideogame} from '../../src/EJERCICIO-PE/functions/updateGame.js';
import {deleteGame} from '../../src/EJERCICIO-PE/functions/deleteGame.js';
import {getGameById} from '../../src/EJERCICIO-PE/functions/getGameById.js';
import { GameDocumentInterface, Game } from '../../src/EJERCICIO-PE/models/game_model.js';
import "../../src/EJERCICIO-PE/db/mongoose.js";

let createdGameId: string;

const gameData: GameDocumentInterface = {
            title: "Hola",
            developer: "adffd",
            publisher: "Abracadabra",
            genre: ["Action"],
            platform: ["PS5"],
            releaseDate: new Date(),
            price: 70,
            score: 90,
            multiplayer: false,
            dlcs: [{
                name: "Expansión 1",
                priceEur: 20
            }]
};

beforeEach(async () => {
    await Game.deleteMany();
    const game = await new Game(gameData).save();
    createdGameId = game._id.toString();
});

describe ("Pruebas de createVideogame", () => {
    test("Es posible crear un videojuego y meterlo en la db ", async() => {
        const game: GameDocumentInterface = {
            title: "DarkSouls",
            developer: "FromSoftware",
            publisher: "Abracadabra",
            genre: ["Action"],
            platform: ["PS5"],
            releaseDate: new Date(),
            price: 70,
            score: 90,
            multiplayer: false,
            dlcs: [{
                name: "Expansión 2",
                priceEur: 20
            }]
        };
        const response = await createVideogame(game);
        expect(response).toMatchObject(game);
    });
});

describe ("Pruebas de getVideogames", () => {
    test("Es posible obtener los videojuegos filtrando por género y plataforma", async() => {
        const filter = {
            genre: "Action",
            platform: "PS5"
        };
        const response = await getVideogames(filter);
        console.log(response);
        expect(response).toBeInstanceOf(Array);
    });
});

describe("Pruebas de getVideogames by id", () => {
    test("Es posible obtener un videojuego por su id", async() => {
        const filter = {
            genre: "Action",
            platform: "PS5"
        };
        const response = await getGameById(createdGameId);
        expect(response).toMatchObject(gameData);
    });
});

describe("Pruenbas de updateGame", () => {
    test("Es posible actualizar un videojuego por su id", async() => {
        const updatedData: GameDocumentInterface = {
            title: "DarkSouls",
            developer: "FromSoftware",
            publisher: "Abracadabra",
            genre: ["Action"],
            platform: ["PS5"],
            releaseDate: new Date(),
            price: 70,
            score: 90,
            multiplayer: false,
            dlcs: [{
                name: "Expansión 2",
                priceEur: 20
            }]
        };
        const response = await updateVideogame(createdGameId, updatedData);
        expect(response).toMatchObject(updatedData);
    });
});

describe ("Pruebas con deleteGame", () => {
    test ("Es posible eliminar un videojuego por su id", async() => {
        const response = await deleteGame(createdGameId);
        expect(response).toMatchObject(gameData);
    });
});
