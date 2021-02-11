import { InMemoryDbService } from 'angular-in-memory-web-api';

//ejecutar comando "npm install angular-in-memory-web-api"

export class GameData implements InMemoryDbService {

  createDb() {

    let games = [
              {
                "id": 0,
                "nombre": "Fifa 20",
                "descripcion": "Un juego de fútbol que te quita el alma",
                "precio": 40,
                "valoracion": 7.3,
                "fechadesalida": '2/7/2020',
                "categorias": ["deporte"],
                "empresa": "EA Sports",
                "imagen": "../assets/images/fifa20.jpg"
              },
              {
                "id": 1,
                "nombre": "Dark Souls 3",
                "descripcion": "Un juego de mundo abierto lleno de demonios que te quita el alma",
                "precio": 45,
                "valoracion": 8.7,
                "fechadesalida": '2/11/2017',
                "categorias": ["fantasía", "acción"],
                "empresa": "Nokushima",
                "imagen": "../assets/images/darksouls3.jpg"
              },
              {
                "id": 2,
                "nombre": "Far Cry 5",
                "descripcion": "Un juego de mundo abierto en un lugar de Estados Unidos donde una secta crea terror",
                "precio": 35,
                "valoracion ": 7.6,
                "fechadesalida": '21/3/2019',
                "categorias": ["acción"],
                "empresa": "Ubisoft",
                "imagen": "../assets/images/farcry5.jpg"
              },

              {
                "id": 3,
                "nombre": "Red Dead Redemption 2",
                "descripcion": "Un juego de mundo abierto en la época del lejano oeste",
                "precio": 60,
                "valoracion": 9.5,
                "fechadesalida": '15/12/2019',
                "categorias": ["rpg", "acción"],
                "empresa": "Nauty Dogs",
                "imagen": "../assets/images/reddeadredemption2.jpg"
              },
              {
                "id": 4,
                "nombre": "Assassin's Creed Odyssey",
                "descripcion": "Un juego de mundo abierto en una época greca a.C. cuyo personaje es un mercenario/a",
                "precio": 35,
                "valoracion": 8.3,
                "fechadesalida": '15/5/2019',
                "categorias": ["rpg", "acción", "aventura"],
                "empresa": "Ubisoft",
                "imagen": "../assets/images/assassinscreedodyssey.jpg"
              }

        ];

        return { games: games };
    }
}