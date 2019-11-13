

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
var request = require('request');
var session = require('express-session');


const IP = process.env.API || "localhost";
const app = express();
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//session
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.disable('etag');

var sess; // global session

app.get('/login', (req, res) => {               
    res.render('login',{});
    
});

app.get('/register', (req, res) => {               
    res.render('register',{});
    
});

app.get('/', (req, res) => {               
    sess = req.session;
    if(!sess.usu) {
        return res.redirect('/login');
    }

    let q = req.query.q;
    let send = q != undefined ? q : ""; 
    var options = {
        url     : `http://${IP}:3000/tweets?q=${send}`,
        method  : 'GET',
        jar     : true,
        headers : headers
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let r = JSON.parse(body);
            res.render('index', {
              usu: sess.usu,
              id1: sess.id_usu,
              tweets: r.mensaje
            });
        }
    });
    //res.render('index',{});
    
});

app.get('/crear', (req, res) => {
            
    let usr = req.query.usr;
    let pass = req.query.pass;

    request.post({url:`http://${IP}:3000/nuevoUsu`, form: {nombre:usr, pass:pass}}, function(error,response,body){
        if (!error && response.statusCode == 200) {
            let r = JSON.parse(body);
            if(r.error == false){
                res.redirect('/login')
            }else{
                res.send('Error al registrar')
            }
        }
    });
})

app.get('/entrar', (req, res) => {

    sess = req.session;
    let usr = req.query.usr;
    let pass = req.query.pass;

    var options = {
        url     : `http://${IP}:3000/usus?q=${usr}`,
        method  : 'GET',
        jar     : true,
        headers : headers
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let r = JSON.parse(body);
            if(r.error == false){
                if(r.mensaje[0].pass == pass){
                    sess.id_usu = r.mensaje[0].id_usu;
                    sess.usu = usr;
                    res.redirect('/');
                }
                else{
                    res.render('login', {mensaje: "Password incorrecta"});
                }
            }
            else{
                res.render('login', {mensaje: "Usuario inexistente"});
            }
        }
    });
})

app.get('/ingresar', (req, res) => {
            
    let usr = req.query.usr;
    let txt = req.query.txt;

    request.post({url:`http://${IP}:3000/nuevoTweet`, form: { usu: usr,texto: txt}}, function(error,response,body){
        if (!error && response.statusCode == 200) {
            let r = JSON.parse(body);
            if(r.error == false){
                res.redirect('/')
            }else{
                res.send('Error al crear Tweet: ' + r.mensaje)
            }
        }
    });
})

app.get('/tweets', (req, res) => {
            
    let q = req.query.q;
    let send = q != undefined ? q : ""; 
    var options = {
        url     : `http://${IP}:3000/tweets?q=${send}`,
        method  : 'GET',
        jar     : true,
        headers : headers
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let r = JSON.parse(body);
            res.render('tweets', {
              tweets: r.mensaje,
              total: Object.keys(r.mensaje).length,
              q: q
            });
        }
    });

});

app.get('/logout', (req, res) => {               
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
    
});

// static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Express server startd on port ${PORT}`));