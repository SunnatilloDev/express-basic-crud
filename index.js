let express = require("express");
let userRouter = require("./routes/user.route");
require("./config/firebase.config");
const { configDotenv } = require("dotenv");
configDotenv();
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/users", userRouter);

app.listen(8080, () => {
    console.log("Server started on: http://localhost:8080");
});
