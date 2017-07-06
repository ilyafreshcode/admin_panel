var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var file = require('./file');



module.exports = function(app) {

    app.post('/getAllVacancies', function(req, res){
        var sql = "select * from allVacancies";
        connection.query(sql, function(err, rows){
            res.send(rows);
        });
    });

    app.post('/addVacancy', function(req, res){
        var sql = 'INSERT INTO allVacancies (name, date, active, linkTo) VALUES (?, ? , ?, ?)';
        var values = [req.body.name, req.body.date, req.body.isActive, req.body.name];
        connection.query(sql,values, function(err){
            if(err){
                res.status(400).send('Bad request');
                console.log(err.message);
            }
            else{
                rewriteActiveVacancies();
                res.status(200).send('Vacancy was added');
            }
        });
    });

    function rewriteActiveVacancies(){
        var sql = "select * from allVacancies where active = '1'";
        connection.query(sql, function(err, rows){
            if(err)
                console.log(err.message);
            else
                file.rewrite(rows);
        });
    }

    app.post('/getCurrentVacancy', function(req, res){
        var sql = "select * from vacancyDescription where idVacancyDescription = ?";
        console.log(req.body.vacancyId);
        connection.query(sql, req.body.vacancyId, function(err, rows){
            res.send(rows[0]);
        });
    });

};