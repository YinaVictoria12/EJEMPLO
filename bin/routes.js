const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
const { controller } =
    require("./Controller");

app.get("/version", (req, res) => {
    res.send({ version: "1.0.0" });
});

app.post("/users", function(req, res) {
    let { user } = req.body;
    controller.setUser(user, res);
});

app.get("/users", (req, res) => {
    controller.getUsers(req, res);
});

app.get("/users/:id", function(req, res) {
    let { id } = req.params;
    controller.getUser(id, res);
});

//Actualizar a un usuario por su id
app.put("/users/:id", function(req, res) {
    let user = req.body.user;
    user.id = req.params.id;
    controller.updateUser(user, res);
});

app.delete("/users/:id", function(req, res) {
    let { id } = req.params;
    controller.deleteUser(id, res);
});

app.post("/users/:user_id/estudiantes", (req, res) => {
    let { user_id } = req.params;
    let { estudiante } = req.body;
    controller.setUserestudiante(user_id, estudiante, res);
});

app.get("/users/:id/estudiantes", function(req, res) {
    let { id } = req.params;
    controller.getUserestudiantes(id, res);
});

app.get("/users/:user_id/estudiantes/:estudiante_id", (req, res) => {
    let { user_id, estudiante_id } = req.params;
    controller.getUserestudiante(user_id, estudiante_id, res);
});

app.post("/subtemass", (req, res) => {
    let { subtemas } = req.body;
    controller.setsubtemas(subtemas, res);
});

app.get("/subtemass", (req, res) => {
    controller.getsubtemass(res);
});

app.get("/subtemass/:id", (req, res) => {
    let { id } = req.params;
    controller.getsubtemas(id, res);
});
app.put("/users/:id_user/estudiantes/:id_estudiante/", function(req, res) {
    let { subtemas_id } = req.body;
    let { id_user, id_estudiante } = req.params;
    controller.updateestudiante(subtemas_id, id_user, id_estudiante, res);
});

app.post("/temass/", (req, res) => {
    let { temas } = req.body;
    controller.settemas(temas, res);
});

app.get("/temass/", (req, res) => {
    controller.gettemass(res);
});

app.get("/temass/:id", (req, res) => {
    let { id } = req.params;
    controller.gettemas(id, res);
});

app.put("/subtemass/:id_subtemas/", function(req, res) {
    let { id_subtemas } = req.params;
    let { temass } = req.body;
    controller.updatesubtemas(id_subtemas, temass, res);
});

exports.app = app;
