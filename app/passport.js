var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(user, done) {
        connection.query("SELECT * FROM users WHERE name = ? ",[name], function(err, rows){
            done(err, rows);
        });
    });

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM users WHERE name = ?",[username], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false);
                    }
                    if (password !== rows[0].password)
                        return done(null, false);

                    return done(null, rows[0]);
                });
            })
    );

};