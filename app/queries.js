var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var file = require('./file');



module.exports = function(app) {

    function rewriteActiveVacancies(){
        var sql = "select * from allVacancies where active = '1'";
        connection.query(sql, function(err, rows){
            if(err)
                console.log(err.message);
            else
                file.rewrite(rows);
        });
    }

    app.post('/getAllVacancies', function(req, res){
        var sql = "select * from allVacancies";
        connection.query(sql, function(err, rows){
            res.send(rows);
        });
    });

    app.post('/addVacancy', function(req, res){
        var sql = "INSERT INTO allVacancies (name, active, linkTo) VALUES (?, ?, ?)";
        var values = [req.body.name, req.body.isActive, req.body.name];
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

    app.post('/getCurrentVacancy', function(req, res){
        var sql = "SELECT allVacancies.name, allVacancies.active, vacancyDescription.experienceText, vacancyDescription.plusText, vacancyDescription.offerText FROM adminpanelFrehscode.allVacancies INNER JOIN adminpanelFrehscode.vacancyDescription ON allVacancies.idAllVacancies = vacancyDescription.idAllVacancies WHERE allVacancies.idAllVacancies = ?";
        connection.query(sql, req.body.vacancyId, function(err, rows){
            res.send(rows[0]);
        });
    });

    app.post('/updateCurrentVacancy', function(req, res){
        var sql = "UPDATE allVacancies SET allVacancies.name = ?, allVacancies.active = ?, allVacancies.linkTo = ? WHERE allVacancies.idAllVacancies = ?";
        var values = [req.body.name, req.body.isActive, req.body.name, req.body.vacancyId];
        connection.query(sql,values, function(err){
            if(err){
                res.status(400).send('Bad request');
                console.log(err.message);
            }
            else{
                //rewrite file
                res.status(200).send('Vacancy was added');
            }
        });
    });

};