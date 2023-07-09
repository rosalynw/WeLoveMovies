const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})

function update (updatedReview) {
    return knex("reviews")
    .select("*")
    .where({"review_id": updatedReview.review_id})
    .update(updatedReview)
    .then((updatedReview) => updatedReview[0])
}


function read(review_id) {
    return knex ("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
        "r.review_id",
        "r.content",
        "r.score",
        "r.created_at",
        "r.updated_at",
        "r.critic_id",
        "r.movie_id",
        "c.critic_id as critic.critic_id",
        "c.preferred_name as critic.preferred_name",
        "c.surname as critic.surname",
        "c.organization_name as critic.organization_name",
        "c.created_at as critic.created_at",
        "c.updated_at as critic.updated_at"
        )
    .where({review_id})
    .first()
    .then(addCritic);
}

function destroy (reviewId) {
    return knex ("reviews as r")
    .select("*")
    .where({ "r.review_id": reviewId})
    .first()
    .del();
}


module.exports = {
    read,
    update,
    delete: destroy,
}