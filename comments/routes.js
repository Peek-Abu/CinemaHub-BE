import * as dao from "./dao.js";

function CommentRoutes(app) {
    const createComment = async (req, res) => {
        const comment = await dao.createComment(req.body);
        res.json(comment);
    };
    const deleteComment = async (req, res) => {
        const status = await dao.deleteComment(req.params.commentId);
        res.json(status);
    };
    const findAllComments = async (req, res) => {
        const comments = await dao.findAllComments();
        res.json(comments);
    };
    const findCommentById = async (req, res) => {
        const comment = await dao.findCommentById(req.params.commentId);
        res.json(comment);
    };
    const findCommentByMovieId = async (req, res) => {
        const comment = await dao.findCommentByMovieId(req.params.movieId);
        res.json(comment);
    };
    const findCommentByUsername = async (req, res) => {
        const comment = await dao.findCommentByUsername(req.params.username);
        res.json(comment);
    };
    const updateComment = async (req, res) => {
        const { commentId } = req.params;
        const status = await dao.updateComment(commentId, req.body);
        res.json(status);
    };

    app.post("/api/comments", createComment);
    app.delete("/api/comments/:commentId", deleteComment);
    app.get("/api/comments", findAllComments);
    app.get("/api/comments/:commentId", findCommentById);
    app.get("/api/comments/movie/:movieId", findCommentByMovieId);
    app.get("/api/comments/user/:userId", findCommentByUsername);
    app.put("/api/comments/:commentId", updateComment);
}

export default CommentRoutes;