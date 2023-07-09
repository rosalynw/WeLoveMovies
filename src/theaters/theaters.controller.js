const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const list = await service.list();
    res.json({ data: list });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}