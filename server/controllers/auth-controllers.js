const User = require('../models/user-model'),
    Admin = require('../models/admin-model'),
    router = require('express').Router(),
    passport = require('passport'),
    { verifyCookie } = require('../middleware/verify-logged-in');

async function isAdmin(user_id) {
    return new Promise((res, rej) => {
        Admin.find({}, (err, users) => {
            if (err) return rej(err);
            let result = false;
            users.map(user => {
                if(String(user.user_id) == String(user_id)){
                    return result = true;
                };
            });
            return res(result);
        });
    });
}

// Registering
router.post('/register', (req, res, next) => {
    try {
        passport.authenticate('register', async (err, user, info) => {
            if (err) return res.status(501).json(err);
            if (!user) return res.status(501).json(info);
            req.logIn(user, async (err) => {
                if (err) return res.status(501).json(err);
                const result = await isAdmin(user._id);
                user.password = undefined;
                req.session.loggedIn = true;
                req.session.save(err => { if (err) return console.log(err); });
                return res.status(200).json({ currentUser: user, isAdmin: result });
            })
        })(req, res, next);
    }
    catch (err) { res.status(500).send(err.message) };
});

// Logging In
router.post('/login', async (req, res, next) => {
    try {
        await passport.authenticate('login', (err, user, info) => {
            if (err) return res.json(err);
            if (info) return res.status(401).json(info);
            req.logIn(user, async (err) => {
                const result = await isAdmin(user._id);
                if (err) return res.status(501).json(err);
                req.session.loggedIn = true;
                req.session.save(err => { if (err) return console.log(err); });
                return res.status(200).json({ currentUser: user, isAdmin: result });
            })
        })(req, res, next);
    }
    catch (err) { res.status(500).send(err.message) };
});

// Logging Out
router.post('/logout', (req, res, next) => {
    const user = req.body;
    const logOutUser = (user) => {
        req.session.destroy();
        req.logOut();
        res.status(200).json("");
    }
    User.findOne({ username: user.username }, (err, info) => { err ? res.status(500).json(err) : logOutUser(info); });
});

// Logging In Using Cookie
router.get('/cookie', verifyCookie, (req, res) => {
    User.findById(req.user._id, async (err, info) => {
        const result = await isAdmin(info._id);
        info.password = undefined;
        if (err) return console.log(err);
        return res.status(200).json({ currentUser: info, isAdmin: result });
    });
});


router.get("/google", passport.authenticate("google", {
    scope: ['profile', "email"]
}));

router.get("/google/redirect", passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:4200');
});



module.exports = router;