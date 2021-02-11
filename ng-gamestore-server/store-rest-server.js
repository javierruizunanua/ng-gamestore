var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Game = /** @class */ (function () {
    function Game(id, nombre, descripcion, precio, valoracion, fechadesalida, categorias, empresa, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.valoracion = valoracion;
        this.fechadesalida = fechadesalida;
        this.categorias = categorias;
        this.empresa = empresa;
        this.imagen = imagen;
    }
    return Game;
}());
var d0 = new Date("2020-03-25");
var d1 = new Date("2017-11-2");
var d2 = new Date("2019-03-21");
var d3 = new Date("2019-12-15");
var d4 = new Date("2019-05-15");
var games = [
    new Game(0, "Fifa 20", "Un juego de fútbol que te quita el alma", 40, 7.3, d0, ["deporte"], "EA Sports", "../assets/images/fifa20.jpg"),
    new Game(1, "Dark Souls 3", "Un juego de mundo abierto lleno de demonios que te quita el alma", 45, 8.7, d1, ["fantasía", "acción"], "Nokushima", "../assets/images/darksouls3.jpg"),
    new Game(2, "Far Cry 5", "Un juego de mundo abierto en un lugar de Estados Unidos donde una secta crea terror", 35, 7.6, d2, ["acción"], "Ubisoft", "../assets/images/farcry5.jpg"),
    new Game(3, "Red Dead Redemption 2", "Un juego de mundo abierto en la época del lejano oeste", 60, 9.5, d3, ["rpg", "acción"], "Nauty Dogs", "../assets/images/reddeadredemption2.jpg"),
    new Game(4, "Assassin's Creed Odyssey", "Un juego de mundo abierto en una época greca a.C. cuyo personaje es un mercenario/a", 35, 8.3, d4, ["rpg", "acción", "aventura"], "Ubisoft", "../assets/images/assassinscreedodyssey.jpg")
];
function getGames() {
    return games;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/game', bodyParser.json(), function (req, res) {
    var gNew = new Game(games.length + 1, req.body.nombre, req.body.descripcion, req.body.precio, req.body.valoracion, req.body.fechadesalida, req.body.categorias, req.body.empresa, req.body.c);
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
});
app.get('/', function (req, res) {
    res.send('The URL of games is http://localhost:8000/games');
});
app.get('/games', function (req, res) {
    res.json(getGames());
});
function getGamesById(gamesId) {
    var g;
    g = games.find(function (g) { return g.id == gamesId; });
    return g;
}
app.get('/games/:id', function (req, res) {
    res.json(getGamesById(parseInt(req.params.id)));
});
function updateGamesById(req, gamesId) {
    var g;
    g = games.find(function (g) { return g.id == gamesId; });
    var index = games.indexOf(g);
    g.nombre = req.body.nombre,
        g.descripcion = req.body.descripcion,
        g.precio = req.body.precio,
        g.valoracion = req.body.valoracion,
        g.fechadesalida = req.body.fechadesalida,
        g.categorias = req.body.categorias,
        g.empresa = req.body.empresa,
        g.imagen = req.body.imagen;
    games[index] = g;
    return g;
}
app.put('/games/:id', function (req, res) {
    res.json(updateGamesById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteGamesById(gameId) {
    var g;
    g = games.find(function (g) { return g.id == gameId; });
    var index = games.indexOf(g);
    delete games[index];
    return g;
}
app["delete"]('/games/:id', function (req, res) {
    res.json(deleteGamesById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
