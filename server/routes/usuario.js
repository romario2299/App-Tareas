const express       = require('express');
const bodyParser    = require('body-parser');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const Usuario       = require('../../models/usuario');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/usuario', function (req, res) {
    
    Usuario.findOne( {email : req.body.email}, (err, usuariodb) => {
        
        if(err || usuariodb == null) {
            return res.status(400).json({
                ok : false,
                massage : "Usuario no encontrado",
                error : err
            });
        }

        if( bcrypt.compareSync( req.body.password, usuariodb.password) ){
            let auth = jwt.sign({
                data: usuariodb.email
            }, process.env.SEMILLA, { expiresIn: '5h' });
            res.json({
                ok : true,
                usuario: usuariodb,
                auth
            });    
        } else {
            res.status(400).json({
                ok : false,
                message : "Verifique contraseña"
            });
        }
    });
});

app.post('/Nuevousuario', function (req, res) {
    
    Usuario.findOne( {email : req.body.email}, (err, usuariodb) => {
        
        if(err || usuariodb != null) {
            return res.status(400).json({
                ok : false,
                massage : "Usuario ya existe",
                error : err
            });
        }
        
        let usuario = new Usuario({
            nombre : req.body.nombre,
            email  : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10)
        });
        
        usuario.save( (err, usuariodb) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    massage : "Usuario no fue guardado",
                    err: err
                });
            } else {
                let auth = jwt.sign({
                    data: usuariodb.email
                }, process.env.SEMILLA, { expiresIn: '5h' });
                return res.json({
                    ok : true,
                    usuario: usuariodb,
                    auth
                });
            }
        });       
    });
});

module.exports = app;