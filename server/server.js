require('./config/config');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); 
require('./database');

app.use(cors({
    origin: "*",
    credentials: true
}
));

app.use( express.static( path.resolve(__dirname, '../public/dist/public/' )));

app.use( require("./routes/usuario") );
app.use( require("./routes/tareas") );

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando', process.env.PORT);
});
