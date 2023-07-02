const path = require("path");
const service = require("./movies.service");

function list(req,res) {
    const { is_showing } = req.query;
    service.list(is_showing)
    .then((list) => {
        if (is_showing) {
            return res.json({ data: list.splice(0,15) })
        }
        else {
            return res.json({ data: list })
        }
    })
    .catch(next);
}

module.exports = {
    list,
}