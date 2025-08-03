const express =require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");
const connectdb = require("./config/db");


app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/notes', noteRoutes);

connectdb();

module.exports = app;