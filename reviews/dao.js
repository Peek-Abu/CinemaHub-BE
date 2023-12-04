import model from "./model.js";
import * as userDao from "../users/dao.js";

export const createReview = async (review) => {
    const user = await userDao.findUserByUsername(review.username);
    console.log("user is " + JSON.stringify(user) + "from review " + JSON.stringify(review));
    if (user) {
        await model.create(review);
        const created_review = await model.findOne(review);
        if (user.reviews) {
            user.reviews.push(created_review._id);
            await userDao.updateUser(user._id, user);
        } else {
            user.reviews = [created_review._id];
        }
        await userDao.updateUser(user._id, user);
    }
}
export const findAllReviews = () => model.find().populate("movieId").exec();
export const findReviewById = (reviewId) => model.findOne({ _id: reviewId });
export const findReviewByMovieId = (movieId) =>
  model.find({ movieId: movieId });
export const findReviewByUsername = (userId) => model.find({ username: userId });
export const updateReview = (reviewId, review) =>
  model.updateOne({ _id: reviewId }, { $set: review });
export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });
