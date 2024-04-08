if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const User = require("./models/user.js");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const authenicationRouter = require("./routes/authentication.js");
const adminRouter = require("./routes/admin.js");
const cartRouter = require("./routes/cart.js")
const { storage } = require("./cloudconfig.js");
const ExpressError = require("./ExpressError.js");
const wrapAsync = require("./utils/wrapasync.js");
const Product = require('./models/productmodel.js');
const MongoStore = require('connect-mongo');
// port
const port = 8080;
const dburl = process.env.DB_URL


// connection
main()
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log("failed to connect" + err));
  async function main() {
  await mongoose.connect(dburl);
}

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: 'krishna'
  },
  touchAfter: 24 * 3600
})

store.on("error",()=>{
  console.log("error occure in mongo store")
})


const sessionOption = {
  store,
  secret: "krishna",
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// Middleware
app.use(session(sessionOption));
app.use(express.json());

// cors
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: allowedOrigins,
    method: "GET,POST,DELETE,PUT",
    credentials: true,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// multer
const upload = multer({ storage: storage });

app.post("/api/admin/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: req.file.path,
    image_filename: req.file.filename
  });
});

// routes
app.get("/newcollection",wrapAsync(async(req,res)=>{
  const product = await Product.find()
  const  newcollection = product.slice(-8);
  res.send(newcollection)
}))

app.get("/popular",wrapAsync(async(req,res)=>{
  const product = await Product.find({category:'women'})
  const  newcollection = product.slice(0,4);
  res.send(newcollection)
}))


app.use("/api", authenicationRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart",cartRouter)

app.all("*",(req,res,next)=>{
  next(new ExpressError(false,400,"page not found"))
})

app.use((error, req, res, next) => {
  let{statusCode=500,message="something went wrong"} = error
  res.status(statusCode).json({
    success:false,
    message:message,
  })
});

app.listen(port, (err) => {
  if (!err) {
    console.log("server is working well");
  } else {
    console.log("Error:" + err);
  }
});
