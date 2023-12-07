import * as dao from "./dao.js";

function ReelRoutes(app) {
  const createReel = async (req, res) => {
    const reel = await dao.createReel(req.body.reel, req.body.movies);
    res.json(reel);
  };
  const findAllReels = async (req, res) => {
    const reels = await dao.findAllReels();
    res.json(reels);
  };
  const findReelById = async (req, res) => {
    const reel = await dao.findReelById(req.params.reelId);
    res.json(reel);
  };
  const updateReel = async (req, res) => {
    const { reelId } = req.params;
    const status = await dao.updateReel(reelId, req.body);
    res.json(status);
  };
  const addMovieToReel = async (req, res) => {
    const { reelId, movieId } = req.params;
    const status = await dao.addMovieToReel(reelId, movieId);
    res.json(status);
  }
  const deleteReel = async (req, res) => {
    const status = await dao.deleteReel(req.params.reelId);
    res.json(status);
  };

  app.post("/api/reels", createReel);
  app.get("/api/reels", findAllReels);
  app.get("/api/reels/:reelId", findReelById);
  app.put("/api/reels/:reelId", updateReel);
  app.put("/api/reels/:reelId/:movieId", addMovieToReel);
  app.delete("/api/reels/:reelId", deleteReel);
}

export default ReelRoutes;
