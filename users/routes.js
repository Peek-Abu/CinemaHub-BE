import * as dao from "./dao.js";
import * as reviewDao from "../reviews/dao.js";
import { findReviewsByUsername } from "../reviews/dao.js";

function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const findUserByUsername = async (req, res) => {
    if ((await dao.findUserByUsername(req.params.username)) == null) {
      const user = await dao.findUserByUsername(req.params.username);
      res.json(user);
    } else {
      res.status(400).json({ error: "Username already used" });
    }
  };
  const findUserByCredentials = async (req, res) => {
    const user = await dao.findUserByCredentials(
      req.params.username,
      req.params.password,
    );
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { username } = req.params;

    const user = await dao.findUserByUsername(username);
    // update the followers
    const followers = user.followers;
    for (let i = 0; i < followers.length; i++) {
      const follower = await dao.findUserByUsername(followers[i]);
      follower.following = follower.following.map((u) =>
        u === username ? req.body.username : u,
      );
      await dao.updateUser(follower.username, follower);
    }

    // update the following
    const followings = user.following;
    for (let i = 0; i < followings.length; i++) {
      const following = await dao.findUserByUsername(followings[i]);
      following.followers = following.followers.map((u) =>
        u === username ? req.body.username : u,
      );
      await dao.updateUser(following.username, following);
    }

    // update our reviews
    const reviews = await reviewDao.findReviewsByUsername(username);
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      review.username = req.body.username;
      await reviewDao.updateReview(review._id, review);
    }

    // update the user
    const status = await dao.updateUser(username, req.body);

    res.json(status);
  };
  const deleteUser = async (req, res) => {
    const { username } = req.params;
    console.log("Username: " + username);
    const user = await dao.findUserByUsername(username);
    // update the followers
    const followers = user.followers;
    console.log("Followers: " + followers);
    for (let i = 0; i < followers.length; i++) {
      const follower = await dao.findUserByUsername(followers[i]);
      console.log("Follower before: " + follower);
      follower.following = follower.following.filter((u) => u !== username);
      console.log("Follower after: " + follower);
      await dao.updateUser(follower.username, follower);
    }
    console.log("done");

    // update the following
    const followings = user.following;
    for (let i = 0; i < followings.length; i++) {
      const following = await dao.findUserByUsername(followings[i]);
      following.followers = following.followers.filter((u) => u !== username);
      await dao.updateUser(following.username, following);
    }

    // delete our reviews
    const reviews = await reviewDao.findReviewsByUsername(username);
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      await reviewDao.deleteReview(review._id);
    }

    // delete the user
    const status = await dao.deleteUser(req.params.username);

    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ error: "Username already taken" });
    } else {
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    }
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.json({ status: "OK" });
  };
  const account = async (req, res) => {
    res.json(req.session["currentUser"]);
  };

  const addFollower = async (req, res) => {
    const { username } = req.params;
    const currentUser = req.session["currentUser"];
    const followerUser = await dao.findUserByUsername(username);

    // TODO: Add logic for repeat following just to make sure
    // TODO: Add logic for adding followers as well only had following at the moment
    if (currentUser && followerUser) {
      currentUser.following.push(followerUser.username);
      // currentUser.followers.push(followerUser._id);
      // followerUser.following.push(currentUser._id);
      await dao.updateUser(currentUser._id, currentUser);
      // await dao.updateUser(followerUser._id, followerUser);
      res.json(currentUser);
    } else {
      res.status(400).json({ error: "Username does not exist" });
    }
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/username/:username", findUserByUsername);
  app.get("/api/users/credentials/:usr/:pass", findUserByCredentials);
  app.put("/api/users/:username", updateUser);
  app.delete("/api/users/:username", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);

  app.put("/api/users/username/:username/follow", addFollower);
}

export default UserRoutes;
