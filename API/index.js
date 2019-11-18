const _ = require('underscore');
const HashMap = require('hashmap');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mysql = require('mysql'); 

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.disable('etag');

const connection = mysql.createConnection({
    host            : database,//process.env.DB,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});


connection.connect(function(err){
    if(err){
        console.error("error connecting: " + err.stack);
        return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
    }
    console.log("connected as id " + connection.threadId);
});


app.get('/', (req, res) => {
    res.send("Hola mundo!")
});


app.get('/usus',function(req,res){
    let q = req.query.q;
    var data = {
        "error"     : false,
        "mensaje"   : ""
    };

    if(!!q){
        connection.query("SELECT * FROM Usu WHERE nombre = ?",[q],function(err, rows, fields){
            if(rows.length != 0){
                data["mensaje"] = rows;
                res.json(data);
            }else{
                data["error"] = true;
                data["mensaje"] = 'No se encontró al usuario';
                res.json(data);
            }
        });
    }
    else{
        connection.query("SELECT * FROM Usu",function(err, rows, fields){
            if(rows.length != 0){
                data["mensaje"] = rows;
                res.json(data);
            }else{
                data["error"] = true;
                data["mensaje"] = 'No se recuperó ningun usuario';
                res.json(data);
            }
        });
    }
});


app.post('/nuevoUsu',function(req,res){
    var a1 = req.body.nombre;
    var a2 = req.body.pass;
    var data = {
        "error"     : true,
        "Message"   : ""
    };

    if(!!a1 && !!a2){
        connection.query("INSERT INTO Usu (nombre, pass) VALUES (?, ?)",[a1,a2],function(err, rows, fields){
            if(!!err){
                data["Message"] = "Error: No se pudo agregar";
            }else{
                data["error"] = false;
                data["Message"] = "Exito";
            }
            res.json(data);
        });
    }else{
        data["error"] = true;
        data["Message"] = "Error: Faltan campos: " + a1 + ", " + a2;
        res.json(data);
    }
});


app.post('/nuevoTweet',function(req,res){
    var a1 = parseInt(req.body.usu, 10);
    var a2 = req.body.texto;
    var data = {
        "error"     : true,
        "mensaje"   : ""
    };

    if(!!a1 && !!a2){
        connection.query("INSERT INTO Tweet (id_usu, texto) VALUES (?, ?)",[a1,a2],function(err, rows, fields){
            if(!!err){
                data["mensaje"] = "Error: No se pudo agregar tweet: " + err;
            }else{
                data["error"] = false;
                data["mensaje"] = "Exito";
            }
            res.json(data);
        });
    }else{
        data["mensaje"] = "Error: Faltan campos: " + a1 + ", " + a2;
        res.json(data);
    }
});


app.get('/tweets',function(req,res){
    let q = req.query.q;
    var data = {
        "error"     : false,
        "mensaje"   : ""
    };

    if(!!q){
        connection.query("SELECT U.nombre, T.texto FROM Tweet AS T INNER JOIN Usu AS U ON T.id_usu = U.id_usu WHERE U.nombre = ?",[q],function(err, rows, fields){
            if(rows.length != 0){
                data["mensaje"] = rows;
                res.json(data);
            }else{
                data["error"] = true;
                data["mensaje"] = 'No existen tweets de ese usuario';
                res.json(data);
            }
        });
    }
    else{
        connection.query("SELECT U.nombre, T.texto FROM Tweet AS T INNER JOIN Usu AS U ON T.id_usu = U.id_usu",function(err, rows, fields){
            if(rows.length != 0){
                data["mensaje"] = rows;
                res.json(data);
            }else{
                data["error"] = true;
                data["mensaje"] = 'No se obtuvieron los tweets';
                res.json(data);
            }
        });
    }
});


// static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express server startd on port ${PORT}`));