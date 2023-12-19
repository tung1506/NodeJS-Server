var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var bcrypt = require('bcryptjs');
import db from '../models/index';

passport.serializeUser(function (user, done) {
    done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(function (user, done) {
    db.User.findByPk(user.id).then(function (fullUser) {
        if (fullUser) {
            done(null, fullUser);
        } else {
            done(null, null);
        }
    }).catch(function (err) {
        console.log(err);
        done(err, null);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return done(err);
                }

                if (!result) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
        }).catch(function (err) {
            return done(err);
        });
    }
));

