"use strict";
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
var games = [
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
app.post('/games', bodyParser.json(), function (req, res) {
    var gNew = new Game(games.length + 1, req.body.title, req.body.price, req.body.rating, req.body.shortDescription, req.body.description, req.body.categories, req.body.images);
    games.push(gNew);
    res.status(200).send({
        id: gNew.id,
        title: gNew.title,
        price: gNew.price,
        rating: gNew.rating,
        shortDescription: gNew.shortDescription,
        description: gNew.description,
        categories: gNew.categories,
        images: gNew.images
    });
});
app.get('/', function (req, res) {
    res.send('The URL of games is http://localhost:8000/games');
});
app.get('/games', function (req, res) {
    res.json(getGames());
});
function getGamesById(gameId) {
    var g;
    g = games.find(function (g) { return g.id == gameId; });
    return g;
}
app.get('/games/:id', function (req, res) {
    res.json(getGamesById(parseInt(req.params.id)));
});
function updateGamesById(req, gameId) {
    var g;
    g = games.find(function (g) { return g.id == gameId; });
    var index = games.indexOf(g);
    g.title = req.body.title,
        g.price = req.body.price,
        g.rating = req.body.rating,
        g.shortDescription = req.body.shortDescription,
        g.description = req.body.description,
        g.categories = req.body.categories,
        g.images = req.body.images;
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
app.delete('/games/:id', function (req, res) {
    res.json(deleteGamesById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
