const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tareas: [{
        nombre : String,
        prioridad : String,
        vencimiento : String
    }]
});

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model("Usuario", usuarioSchema);