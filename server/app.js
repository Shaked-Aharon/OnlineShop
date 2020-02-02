const server = require('express')(),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    // cookieSession = require('cookie-session'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(expressSession),
    passport = require('passport'),
    keys = require('./config/keys'),
    multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    upload = multer({ dest: `${__dirname}\\assets\\images` }),
    authControllers = require('./controllers/auth-controllers'),
    productsControllers = require('./controllers/products-controllers'),
    categoriesControllers = require('./controllers/categories-controllers'),
    cartsControllers = require('./controllers/carts-controllers'),
    usersControllers = require('./controllers/users-controllers'),
    ordersControllers = require('./controllers/orders-controllers');

// Setting Server Up
server.use(require('express').json());
server.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true}));
server.use(require('express').static(__dirname));

// Setting DB Up
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, mongoClient) => {
    if (err) return console.log(err);
    console.log(`Connected to ${mongoClient.name}`);
});
server.use(expressSession({
    name: keys.session.name,
    resave: false,
    saveUninitialized: false,
    secret: keys.session.cookieKey,
    cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Setting Server Services Up

// // Passport.js
require('./config/passport-setup');
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

// // Image Uploading
server.post("/upload-image", upload.any() ,(req, res) => {
    const fileType = path.extname(req.files[0].originalname);
    const fileOriginal = `${req.files[0].destination}\\${req.files[0].filename}${fileType}`;
    const multerFilename = `${req.files[0].destination}\\${req.files[0].filename}`;
    fs.rename(multerFilename, fileOriginal, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(200).json(`${req.files[0].filename}${fileType}`);
    });
});

// Server Online
server.use('/api/auth', authControllers);
server.use('/api/products', productsControllers); // Handle both products and categories 
server.use('/api/categories', categoriesControllers); // Handle both products and categories 
server.use('/api/carts', cartsControllers); // Handle Carts, CartProducts
server.use('/api/users', usersControllers);
server.use('/api/orders', ordersControllers);

server.listen(keys.env.PORT, () => console.log(`Connected to port ${keys.env.PORT}`));