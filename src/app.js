if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require('./movies/movies.router')
const theatersRouter = require('./theaters/theaters.router');

app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);



app.use((req, res, next) => {
    res.status(404).json({ error: `Not found: ${req.originalUrl}`})
})

app.use((req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message })
})
module.exports = app;
