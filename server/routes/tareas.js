const express       = require('express');
const Usuario       = require('../../models/usuario');
const vericarToken = require('../middlewares/autenticacion');

const app = express();

app.get('/tareas', vericarToken, function (req, res) {

    Usuario.findOne({ email: req.usuario }, (error, usuariodb) => {
        if(error){
            return res.status(400).json({
                ok : false,
                message : "Sin resultados",
                error
            });
        }
        
        res.json({
            ok : true,
            usuario : usuariodb
        });
    });
});

app.post('/tareas', vericarToken, function (req, res) {

    let tarea = {
        nombre : req.body.nombre,
        prioridad : req.body.prioridad,
        vencimiento : req.body.vencimiento
    }

    Usuario.findOneAndUpdate({ email: req.usuario}, { $push : { tareas : tarea }}, { new: true }, (error, usuariodb) => {
        if(error){
            return res.status(400).json({
                ok : false,
                massage : "Tarea no creada",
                error
            });
        }

        res.json({
            ok : true,
            massage : "Tarea creada",
            usuario : usuariodb
        })
    });
});

app.put('/tareas', vericarToken, function (req, res) {

    let tarea = {
        _id : req.body._id,
        nombre : req.body.nombre,
        prioridad : req.body.prioridad,
        vencimiento : req.body.vencimiento
    }

    Usuario.findOneAndUpdate(
        { email: req.usuario}, 
        { $set : { "tareas.$[e]" : tarea }},
        { new : true, multi: false, arrayFilters : [{ "e._id" : req.body._id }]},
        (error, usuariodb) => {
        
            if(error){
            return res.status(400).json({
                ok : false,
                massage : "Tarea no actualizada",
                error
            });
        }

        res.json({
            ok : true,
            massage : "Tarea actualizada",
            usuario : usuariodb
        })
    });

});

app.delete('/tareas', vericarToken, function (req, res) {

    let _id = req.query.id;

    Usuario.findOneAndUpdate(
        { email: req.usuario}, 
        { $pull : { tareas : { _id }}},
        { new : true, multi : false},
        (error, usuariodb) => {
        
            if(error){
            return res.status(400).json({
                ok : false,
                massage : "Tarea no borrada",
                error
            });
        }

        res.json({
            ok : true,
            massage : "Tarea borrada",
            usuario : usuariodb
        });
    });
});

module.exports = app;