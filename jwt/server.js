const express = require('express')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const app = express()
const port = 3000

let json =
{
    "type": "collection", "count": 3, "commandes": [
        {
            "id": "AuTR4-65ZTY",
            "mail_client": "jan.neymar@yaboo.fr",
            "nom_client": "jan neymar",
            "date_commande": "2022-01-05 12:00:23",
            "date_livraison": "2022-01-06 10:30",
            "montant": 25.95
        },
        {
            "id": "657GT-I8G443",
            "mail_client": "jan.neplin@gmal.fr",
            "nom_client": "jan neplin",
            "date_commande": "2022-01-06 16:05:47",
            "date_livraison": "2022-01-07 11:30",
            "montant": 42.95
        },
        {
            "id": "K9J67-4D6F5",
            "mail_client": "claude.francois@grorange.fr",
            "nom_client": "claude francois",
            "date_commande": "2022-01-07 17:36:45",
            "date_livraison": "2022-01-08 12:30",
            "montant": 14.95
        },
    ],
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Hello Ziyi! Have a nice day !')
})

app.get("/commandes", auth, async(req, res, next) => {
    let commandes = []
    json.commandes.forEach(commande => {
        commandes.push({
            id: commande.id,
            mail_client: commande.mail_client,
            date_commande: commande.date_commande,
            montant: commande.montant

        });
    });
    res.json(commandes)
})

app.post('/login', function (req, res){
    const username = req.body.username
    const user = {name: username}

    // sign with RSA SHA256
    const accessToken = jwt.sign({user}, 'my_secret_key', {algorithm: 'HS256', expiresIn: '600s'})
    return res.status(201).json({
        user: req.headers.nom,
        token: accessToken
    });
})

function auth(req, res, next) {
    if(req.headers['authorization']){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token !== null){
            jwt.verify(token, 'my_secret_key', (err, user) => {
                if(err){
                    res.status(500).json({
                        error: "Not Authorized"
                    });
                    throw new Error("Not Authorized");
                }
                req.user = user
                next();
            })
        }
    }else{
        return res.status(401).json({
            error: "Missing credential"
        })
    }
}

app.use((function (req, res) {
    res.sendStatus(404)
}))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})




