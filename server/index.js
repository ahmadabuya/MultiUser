import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import db from "./config/Database.js";
import AuthRoute from "./routes/AuthRoute.js";
import SequelizeStore from "connect-session-sequelize";

dotenv.config();
// (async()=>{
//     await db.sync();
// })();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
