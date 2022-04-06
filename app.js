require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require('connect-flash');
const config = require('config');

const MongoDBStore = require('connect-mongodb-session')(session);
// import Routes
const authRouter = require("./routes/authRouter");
const dashboardRouter = require('./routes/dashboardRouter')
// playground  routes  //To Do should be delete
const validatorRouter = require('./playground/validator')

// import middleware 

const {bindUserWithRequest} = require('./middleware/authMiddleware');
const setLocals = require("./middleware/setLocals");
console.log( 'ENVIRONMENT',process.env.NODE_ENV)
const app = express();
 console.log(app.get('env'))
 
const MONGODB_URI = `mongodb+srv://${config.get('db-user')}:${config.get('db-pass')}@cluster0.9yfqt.mongodb.net/my-blog`
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2
});

// view engine setup
app.set("view engine", "ejs");
app.set("views", "views");


// middleware array
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.json(),
  express.urlencoded({ extended: true }),
  session({
    secret:  config.get('secret') || 'SECRET_KEY',
    resave: false,
    saveUninitialized: false ,
    store: store
  }),
 bindUserWithRequest(),
 setLocals(),
 flash()
];

app.use(middleware);

app.use("/auth", authRouter);
app.use('/dashboard', dashboardRouter)
app.use('/playground', validatorRouter)

delete app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
const PORT = process.env.PORT || 4000;
mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected succuessfully");
    app.listen(PORT, () => console.log(`server running on port${PORT}`));
  })
  .catch((e) => {
    return console.log(e);
  });
