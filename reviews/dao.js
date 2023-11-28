import model from "./model.js";

export const createReview = (review) => model.create(review);
export const findAllReviews = () => model.find().populate("movieId").exec();
export const findReviewById = (reviewId) => model.findOne({ _id: reviewId });
export const findReviewByMovieId = (movieId) =>
  model.find({ movieId: movieId });
export const findReviewByUsername = (userId) => model.find({ userId: userId });
export const updateReview = (reviewId, review) =>
  model.updateOne({ _id: reviewId }, { $set: review });
export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });
