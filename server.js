const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bcrypt = require('bcryptjs'); 
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
const UserModel = require('./server/models/User');
const multer = require('multer');
const app = express();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// ==========================================================================================

const mongoURI = "mongodb+srv://aravindstackup:aravind@cluster0.bkwgkbu.mongodb.net/?retryWrites=true&w=majority"

mongoose 
   .connect(mongoURI, {
    useNewUrlParser:true,
   })
   .then((res) => {
    console.log("mongoDB connected")
   });

   const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mysessions',
   })

app.use(
    session({
        secret: "key that will sign cookie",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

const isAuth = (req,res,next) => {
    if(req.session.isAuth) {
        next();
    }
    else{
        res.redirect('/login')
    }
}


app.get("/", (req,res) => {
    res.render("landing");
});

app.get("/login", (req,res) => {
    res.render("login");
});

app.post("/login", async (req,res) => {

    const {email, password} = req.body;
    
    const user = await UserModel.findOne({ email });

    if(!user) {
        return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.redirect("/login");
    }
    req.session.isAuth = true;

    res.redirect("dashboard");
});

app.get("/register", (req,res) => {
    res.render("register");
});

app.post("/register", async (req,res) => {
    const {username, email, password} = req.body;

    let user = await UserModel.findOne({email});

    if(user) {
        return res.redirect('/register');
    }

    const hashedPsw = await bcrypt.hash(password, 12); 

    user = new UserModel({
        username,
        email,
        password: hashedPsw
    });
    
    await user.save();

    res.redirect("/login");    

});

app.get("/dashboard", isAuth,(req,res) => {
    res.render("index");
});

app.get("/logout", (req,res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect("/");
    });
});





// ============================================================================================

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();



// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// load router
app.use('/',require('./server/routes/router'));

app.listen(PORT, () => {console.log(`server is running on http://localhost:${PORT}`)});






// ========================================================
// ========================================================