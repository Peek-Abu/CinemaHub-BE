import model from "./model.js";

export const createComment = (comment) => model.create(comment);
export const findAllComments = () => model.find();
export const findCommentById = (commentId) => model.findOne({ _id: commentId });
export const findCommentByMovieId = (movieId) => model.find({ movieId: movieId });
export const findCommentByUsername = (userId) => model.find({ userId: userId });
export const updateComment = (commentId, comment) =>
  model.updateOne({ _id: commentId }, { $set: comment });
export const deleteComment = (commentId) => model.deleteOne({ _id: commentId });