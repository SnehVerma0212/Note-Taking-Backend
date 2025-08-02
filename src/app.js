const express =require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.routes");
const connectdb = require("./config/db");


app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRoutes);
//app.use()

connectdb();

module.exports = app;