var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(app) {

    app.post('/getAllVacancies', function(req, res){
        var sql = "select * from allVacancies";
        connection.query(sql, function(err, rows){
            res.send(rows);
        });

    });

};