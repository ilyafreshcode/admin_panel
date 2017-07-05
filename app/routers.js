module.exports = function(app, passport) {
    app.get('/', function (req, res) {
        res.render('index', {title: "Admin Panel - Freshcode"});
    });

    app.get('/login', function (req, res) {
        res.render('index-login', {title: "Login - Admin Panel - Freshcode", layout: false});
    });



    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                res.status(401);
                res.end(info.message);
                return;
            }
            res.redirect('/');
        })(req, res, next);
    });


};