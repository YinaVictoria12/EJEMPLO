const mongoose = require("mongoose");
const User = require("./models/User");
const estudiante = require("./models/estudiante");
const subtemas = require("./models/subtemas");
const temas = require("./models/temas");

class Controller {
    constructor() {
        this.connect();
    }

    async connect() {
        try {            await mongoose.connect(
                "mongodb+srv://ADMIN:admin@cluster0.ie7bz.mongodb.net/?retryWrites=true&w=majority",
                             { useNewUrlParser: true }
            );            console.log("Connected databases.");
        } catch (e) {            console.error(e);
        }
    }
    setUser(user, res) {
        User.create(user, function(err, newUser) {
            if (err) throw err;
            res.send({ status: 200, nU: newUser });
        });
    }
    getUsers(req, res) {
      User.find({}, (err, users) => {
            if (err) throw err;
            res.send({ allUsers: users });
        });
    }

    getUser(id, res) {
        User.find({ _id: id }, (err, user) => {
            if (err) throw err;
            res.send({ User: user });
        });
    }

    updateUser(user, res) {
        let { id, picture, password } = user;
        User.updateOne(
            { _id: id },
            { $set: { picture: picture, password: password } }
        )
            .then(rawResponse => {
                res.send({ message: "User updated", raw: rawResponse });
            })
            .catch(err => {
                if (err) throw err;
            });
    }

    deleteUser(id, res) {
        User.deleteOne({ _id: id }, function(err) {
            if (err) throw err;
            res.send({ message: "User has been deleted" });
        });
    }     setUserestudiante(user_id, estudiante, res) {
        estudiante.user_id = user_id;
        estudiante.create(estudiante, function(err, newestudiante) {
            if (err) return handleError(err);
            res.send({ status: 200, id_estudiante: newestudiante._id });
        });
    }

    getUserestudiantes(id, res) {
        estudiante.find({ user_id: id }, function(err, userestudiante) {
            if (err) throw err;
            res.send({ status: 200, user_estudiante: userestudiante });
        });
    }

    getUserestudiante(user_id, estudiante_id, res) {
        estudiante.find({ _id: estudiante_id, user_id: user_id })
            .populate({
                path: "subtemas_id",
                select: "name temass duraction",
                populate: {
                    path: "temass",
                    select: "name1 name2 last_name1 last_name2"
                }
            })
            .exec(function(err, userestudiantesubtemas) {
                if (err) throw err;
                res.send({ status: 200, user_estudiante_subtemas: userestudiantesubtemas });
            });
    }

    //CRUD subtemas
    setsubtemas(subtemas, res) {
        subtemas.create(subtemas, function(err, newsubtemas) {
            if (err) throw err;
            res.send({ status: 200, id_subtemas: newsubtemas._id });
        });
    }
    getsubtemass(res) {
        subtemas.find().exec(function(err, subtemass) {
            if (err) throw err;
            res.send({ status: 200, temass: subtemass });
        });
    }
    getsubtemas(id, res) {
        subtemas.find({ _id: id }).exec(function(err, subtemas) {
            if (err) throw err;
            res.send({ status: 200, temass: subtemas });
        });
    }

    updateestudiante(subtemas_id, id_user, id_estudiante, res) {
        estudiante.updateOne({ _id: id_estudiante }, { $push: { subtemas_id: subtemas_id } })
            .then(rawResponse => {
                res.send({ message: "estudiante updated", raw: rawResponse });
            })
            .catch(err => {
                if (err) throw err;
            });
    }

    //CRUD temas
    settemas(temas, res) {
        temas.create(temas, function(err, newtemas) {
            if (err) throw err;
            res.send({ status: 200, id_temas: newtemas._id });
        });
    }

    gettemass(res) {
        temas.find().exec(function(err, temas) {
            if (err) throw err;
            res.send({ status: 200, temass: temas });
        });
    }

    gettemas(id, res) {
        temas.find({ _id: id }).exec(function(err, temas) {
            if (err) throw err;
            res.send({ status: 200, temass: temas });
        });
    }

    updatesubtemas(subtemas_id, temass, res) {
        subtemas.updateOne({ _id: subtemas_id }, { $push: { temass: temass } })
            .then(rawResponse => {
                res.send({ message: "subtemas updated", raw: rawResponse });
            })
            .catch(err => {
                if (err) throw err;
            });
    }
}
exports.controller = new Controller();
