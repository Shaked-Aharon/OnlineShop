const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin-model');
const User = require('../models/user-model');
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");


passport.use('login', new LocalStrategy(
    (username, password, done) => {
        return new Promise((res, rej) => {
            User.findOne({ email: username }, (err, user) => {
                if (err) return rej(done(err));
                if (!user) {
                    return User.findOne({ username }, (err, user) => {
                        if (err) return rej(done(err));
                        if (!user) return rej(done("There is no such user"));
                        if (!user.isPasswordValid(password, user.password)) return rej(done("Username nor Password was Incorrect"));
                        user.password = undefined;
                        return res(done(null, user));
                    });
                }
                if (!user.isPasswordValid(password, user.password)) return rej(done("Username nor Password was Incorrect"));
                user.password = undefined;
                return res(done(null, user));
            });
        });
    }
));



passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    return new Promise((res, rej) => {
        let newUser = { ...req.body };
        newUser.address = {
            city : null,
            street : null,
            house : null,
            entrance : null,
            floor : null,
            apartment : null
        };
        const errors = [];
        for (let prop in newUser) {
            if (!newUser[prop]) { errors.push(`${prop} is missing...`); }
        }
        if (errors.length > 0) return rej(done(errors));
        User.findOne({ username }, (err, user) => {
            if (err) return rej(done(err));
            if (user) return res(done(null, false, 'Username is already Taken'));
            else {
                newUser = new User({ ...newUser });

                newUser.password = User.hashPassword(password);
                newUser.save(function (err) {
                    if (err) return res(res.status(501).json(err));
                    return res(done(null, newUser));
                });
            }
        })
    });
}));


passport.use(new GoogleStrategy({
    //options for the google startgey
    callbackURL: "http://localhost:3000/api/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    //check if user exists on db
    const { given_name, family_name, email } = profile._json;
    User.findOne({ email: email }).then((currentUser) => {
        if (currentUser) {
            console.log('current user is' + currentUser);
            done(null, currentUser)
        } else {
            new User({
                email: email,
                firstName: family_name,
                lastName: given_name,
                address: {
                    city : null,
                    street : null,
                    house : null,
                    entrance : null,
                    floor : null,
                    apartment : null
                }
            }).save().then((newUser) => {
                console.log('new uesr created ' + profile);
                done(null, newUser);
            });
        }
    });

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (!user) {
            Admin.findById(id, (err, user) => {
                if (!err) return done(err, user);
            })
        }
        else return done(err, user);
    });
});
module.exports = passport;