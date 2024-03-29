const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: "secret" ,
    resave: false ,
    saveUninitialized: true ,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader(
        "Access-Controll-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-key"
    );
    res.setHeader("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}));
// app.use(cors({ origin: "*"}));
app.use("/", require("./routes/index"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACKURL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
}
))

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});

app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "api-docs", session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    });

process.on("uncaughtException", (err, origin) => {
    console.log(process.stderr.fd, `caught exception: ${err}\n`+ `Exception origin: ${origin}`);
});


mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen (port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
});