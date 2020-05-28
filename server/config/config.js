process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.SEMILLA = process.env.SEMILLA || 'semillaTareas'; 

let urlDB;

if( process.env.NODE_ENV == 'dev' ) {
    urlDB = 'mongodb://localhost:27017/appTareas1';
} else {
    urlDB = 'mongodb://localhost:27017/appTareas1';
}

process.env.URLDB = urlDB;