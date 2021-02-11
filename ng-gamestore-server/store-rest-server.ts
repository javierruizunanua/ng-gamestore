var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Game {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public valoracion: number,
    public fechadesalida: Date,
    public categorias: string[],
    public empresa: string,
    public imagen: ''
  ) { }
}


const games: Game[] = [
  new Game(
    0,
    "Fifa 20",
    "Un juego de fútbol que te quita el alma",
    40,
    7.3,
    '2/7/2020',
    ["deporte"],
    "EA Sports",
    "../assets/images/fifa20.jpg"
  ),
  new Game(
    1,
    "Dark Souls 3",
    "Un juego de mundo abierto lleno de demonios que te quita el alma",
    45,
    8.7,
    '2/11/2017',
    ["fantasía", "acción"],
    "Nokushima",
    "../assets/images/darksouls3.jpg"
  ),
  new Game(
    2,
    "Far Cry 5",
    "Un juego de mundo abierto en un lugar de Estados Unidos donde una secta crea terror",
    35,
    7.6,
    '21/3/2019',
    ["acción"],
    "Ubisoft",
    "../assets/images/farcry5.jpg"
  ),
  new Game(
    3,
    "Red Dead Redemption 2",
    "Un juego de mundo abierto en la época del lejano oeste",
    60,
    9.5,
    '15/12/2019',
    ["rpg", "acción"],
    "Nauty Dogs",
    "../assets/images/reddeadredemption2.jpg"
  ),
  new Game(
    4,
    "Assassin's Creed Odyssey",
    "Un juego de mundo abierto en una época greca a.C. cuyo personaje es un mercenario/a",
    35,
    8.3,
    '15/5/2019',
    ["rpg", "acción", "aventura"],
    "Ubisoft",
    "../assets/images/assassinscreedodyssey.jpg"
  )
]



function getGames(): any[] {
  return games;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/game', bodyParser.json(), (req: any, res: any) => {

  let gNew = new Game(
    games.length + 1,
    req.body.nombre,
    req.body.descripcion,
    req.body.precio,
    req.body.valoracion,
    req.body.fechadesalida,
    req.body.categorias,
    req.body.empresa,
    req.body.c
  );
  games.push(gNew);
  res.status(200).send({ 
    id: gNew.id,
    nombre: gNew.nombre,
    descripcion: gNew.descripcion,
    precio: gNew.precio,
    valoracion: gNew.valoracion,
    fechadesalida: gNew.fechadesalida,
    categorias: gNew.categorias,
    empresa: gNew.empresa,
    imagen: gNew.imagen
   });
 
})

app.get('/', (req: any, res: any) => {
  res.send('The URL of games is http://localhost:8000/games');
});

app.get('/games', (req: any, res: any) => {
  res.json(getGames());
});


function getGamesById(gamesId: number): any {
  let g: any;
  g = games.find(g => g.id == gamesId);
  return g;
}

app.get('/games/:id', (req: any, res: any) => {
  res.json(getGamesById(parseInt(req.params.id)));
});



function updateGamesById(req:any, gamesId: number): any {
  let g: any;
  g = games.find(g => g.id == gamesId);
  let index = games.indexOf(g);

  g.nombre =  req.body.nombre,
  g.descripcion =  req.body.descripcion,
  g.precio =  req.body.precio,
  g.valoracion =  req.body.valoracion,
  g.fechadesalida =  req.body.fechadesalida,
  g.categorias =  req.body.categorias,
  g.empresa =  req.body.empresa,
  g.imagen =  req.body.imagen
  
  games[index] = g;
  return g;
}

app.put('/games/:id', function (req:any, res:any) {
  res.json(updateGamesById(req, parseInt(req.params.id)));
  res.send('Got a UPDATE request at /user');
});


function deleteGamesById(gameId: number): any {
  let g: any;
  g = games.find(g => g.id == gameId);
  let index = games.indexOf(g);
  delete games[index];
  return g;
}

app.delete('/games/:id', function (req:any, res:any) {
  res.json(deleteGamesById(parseInt(req.params.id)));
  res.send('Got a DELETE request at /user');
});



const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});




