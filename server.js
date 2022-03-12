require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const passport = require('passport');

// Database connection
const url = 'mongodb://localhost:27017/Pizza';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Database connected... ");
}).catch ((error)=>{
    console.log(error);
});



// Session store  // old Version 
// let mongoStore = new MongoDbStore({
//     mongoUrl: 'mongodb://localhost:27017/Pizza',
//     collection: 'sessions'
//   });


// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb://localhost:27017/Pizza',
        // collection: 'sessions'
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 Hours
}))

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())


// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'));
app.set ('view engine', 'ejs');

// Routes
require('./routes/web.js')(app)

const server = app.listen(PORT , () =>{
    console.log(`Listening on port ${PORT}`)
});