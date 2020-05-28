const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    let token = req.get('auth');
    jwt.verify(token, "semillaTareas", (error, decoded) => {
        if(error){
            return res.status(401).json({ 
                ok : false,
                error
            });
        }
        req.usuario = decoded.data;
        next();
    });
}

module.exports = verificarToken;