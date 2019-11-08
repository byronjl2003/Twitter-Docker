//http://34.68.92.86/crear?usr=@jorged104&&pass=daniel

var request = require('request');


var options = {
    url     : `http://localhost/crear?usr=@jorge&&pass=asd`,
    method  : 'GET',
    jar     : true,
    headers : headers
}
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.redirect('/login')
    }
});

var options = {
    url     : `http://localhost/crear?usr=@chino&&pass=asd`,
    method  : 'GET',
    jar     : true,
    headers : headers
}
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.redirect('/login')
    }
});

