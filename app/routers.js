module.exports = function(app, passport) {
    app.get('/', isLoggedIn, function (req, res) {
        res.render('index', {title: "Admin Panel - Freshcode"});
    });

    app.get('/login', isAuthorized, function (req, res) {
        res.render('index-login', {title: "Login - Admin Panel - Freshcode", layout: false});
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                res.status(401);
                res.render('index-login', {title: "Login - Admin Panel - Freshcode", layout: false, error: true});
                return;
            }
            req.login(user.name, function(error) {
                if (error) return next(error);
                return res.redirect('/');
            });

        })(req, res, next);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    function isAuthorized(req, res, next){
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }


};