const knex = require('./knex.js');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let hateoasLinker = require('express-hateoas-links');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(hateoasLinker);


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get("/:commandes_db", function (req, res) {

    knex.raw("SELECT 1").then(() => {
        console.log("Vous êtes connecté sur la base de données");
        if(req.params.commandes !== "commandes"){
            res.status(400).json({
                "type": "error",
                "error": 400,
                "message": "la requête " + req.url.split("/")[1] + "est mal formée"
            })
        }else if(req.params.commandes === "commandes"){
            knex.select("id", "mail", "created_at", "montant").from('commande').then( data => {
                res.json(data);
            })
        }
    })
        .catch(() => {
            res.status(500).json({
                type: "error",
                error: 500,
                message: "erreur lors de la connexion à la base de données"});
        });
})


app.get("/:commandes_db/:id", function (req, res) {
    let id = req.params.id

    knex.raw("SELECT 1").then(() => {
        console.log("Vous êtes connecté sur la base de données");
        knex.select("id").from('commande')
        .then( datas => {
            let tmp = "";
            datas.forEach(val => {
                if(val.id === id){
                    tmp = val.id
                }
            })

            if ((tmp !== "") && (req.params.commandes === "commandes")){
                knex.select("id", "nom", "mail", "created_at", "livraison", "montant").from('commande').where('id', "=", id).then( data => {
                    let tmp = {
                        "type" : "resource",
                        " commande" : data[0],
                    }

                    res.status(200).json(tmp, [
                        {
                            items: { href: "/commandes_db/" + id + "/items/" },
                            self: { href: "/commandes_db/" + id }
                        },
                    ]);

                })
            }else if((tmp === "") && (req.params.commandes === "commandes")){
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /commandes_db/" + id
                })
            }else if(req.params.commandes !== "commandes"){
                res.status(400).json({
                    "type": "error",
                    "error": 400,
                    "message": "la requête " + req.url.split("/")[1] + " est mal formée"
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                type: "error",
                error: 500,
                message: "erreur lors de la connexion à la base de données"});
        });
    })
})


app.put("/commandes_db/:id", function (req, res) {
    let id = req.params.id
    knex.raw("SELECT 1")
    .then(() => {
        console.log("Vous êtes connecté sur la base de données");
        knex.select("id").from('commande')
            .then(datas => {
                let tmp = "";
                datas.forEach(val => {
                    if (val.id === id) {
                        tmp = val.id
                    }
                })

                if (tmp !== "") {
                    knex.select('*')
                        .from('commande')
                        .where('id', '=', id)
                        .update(
                            {
                                nom: req.body.nom,
                                mail: req.body.mail,
                                livraison: req.body.livraison
                            },
                        )
                        .then(data => res.status(204).json({data}))
                } else {
                    res.status(404).json({
                        type: "error",
                        error: 404,
                        message: "ressource non disponible : /commandes_db/" + id
                    })
                }
            })
        }
    )
    .catch(() => {
        res.status(500).json({
            type: "error",
            error: 500,
            message: "erreur lors de la connexion à la base de données"
        });
    });
})


app.get("/commandes_db/:id/items", function (req, res) {
    let id = req.params.id
    knex.select('id', "libelle", "tarif", "quantite").from('item').where('command_id', '=', id).then( data => {
        res.status(200).send(data);
    })
})


app.get("/commandes_db/:id?embed=items", function (req, res) {
    let id = req.params.id
    res.send("ok");
})


app.use(( req,res)=>{
    res.json({
        type: "error",
        error: 405,
        message: "erreur de type 405 Method Not Allowed"
    })
})



module.exports = app;
