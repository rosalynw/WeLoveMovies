// const path = require("path");
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req,res,next) {
    const { is_showing } = req.query;
    await service.list(is_showing)
    .then((list) => {
        if (is_showing) {
            //console.log(list);
            return res.json({ data: list.splice(0,15) })
        }
        else {
            //console.log(list)
            return res.json({ data: list })
        }
    })
    .catch(next);
    
    //return res.json({data: list})
}


//check if movie eixsts
async function movieExists(req,res,next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        //console.log('hello')
        res.locals.movie = movie;
        return next();
    }
    res.status(404).json({ error: "Movie cannot be found"})
}

async function read(req,res,next) {
    res.json({ data: res.locals.movie })
}

async function listTheaters (req, res, next) {
    const { movieId } = req.params;
    const data = await service.listTheaters(movieId);
    res.json({ data: data })
}

async function listReviews (req, res, next) {
    const { movieId } = req.params;
    const data = await service.listReviews(movieId);
    res.json({ data: data });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}