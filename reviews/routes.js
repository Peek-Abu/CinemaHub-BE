import * as dao from "./dao.js";

function ReviewRoutes(app) {
  const createReview = async (req, res) => {
    const review = await dao.createReview(req.body);
    res.json(review);
  };
  const deleteReview = async (req, res) => {
    const status = await dao.deleteReview(req.params.reviewId);
    res.json(status);
  };
  const findAllReviews = async (req, res) => {
    const reviews = await dao.findAllReviews();
    res.json(reviews);
  };
  const findReviewById = async (req, res) => {
    const review = await dao.findReviewById(req.params.reviewId);
    res.json(review);
  };
  const findReviewByMovieId = async (req, res) => {
    const review = await dao.findReviewByMovieId(req.params.movieId);
    res.json(review);
  };
  const findReviewByUsername = async (req, res) => {
    const review = await dao.findReviewByUsername(req.params.userId);
    res.json(review);
  };
  const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const status = await dao.updateReview(reviewId, req.body);
    res.json(status);
  };

  app.post("/api/reviews", createReview);
  app.delete("/api/reviews/:reviewId", deleteReview);
  app.get("/api/reviews", findAllReviews);
  app.get("/api/reviews/:reviewId", findReviewById);
  app.get("/api/reviews/movie/:movieId", findReviewByMovieId);
  app.get("/api/reviews/user/:userId", findReviewByUsername);
  app.put("/api/reviews/:reviewId", updateReview);
}

export default ReviewRoutes;
