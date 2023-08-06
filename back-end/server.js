const express = require("express");
const app = express();
const cors = require("cors");

const dontenv = require("dotenv");
dontenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "accessToken",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

const db = require("./models"); // goes to 'models' folder and creates table based on JS files (except for 'index.js' file which is sequelize JS file)

// Routers
const postRouter = require("./controllers/PostsRouteLink");
app.use("/posts", postRouter);

const commentsRouter = require("./controllers/CommentsRouteLink");
app.use("/comments", commentsRouter);

const usersRouter = require("./controllers/UsersRouteLink");
app.use("/auth", usersRouter);

const likesRouter = require("./controllers/Likes");
app.use("/like", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
