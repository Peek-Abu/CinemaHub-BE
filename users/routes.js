import * as dao from "./dao.js";

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
  const findUserByCredentials = async (req, res) => {
    const user = await dao.findUserByCredentials(
      req.params.username,
      req.params.password,
    );
    res.json(user);
  };
  const findUsersByNames = async (req, res) => {
    const users = await dao.findUsersByNames(req.params.name, req.query.role
      , req.query.minFollowing);
    res.json(users);
  }

  const findUserByUsername = async (req, res) => {
    const user = await dao.findUserByUsername(req.params.username);
    res.json(user);
  }
  
  // TODO this may need to be updated since nested ObjectId
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    res.json(status);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ error: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
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
    console.log(currentUser)
    console.log(followerUser)

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
  app.get("/api/users/names/:name", findUsersByNames);
  app.put("/api/users/:userId", updateUser);
  app.put("/api/users/username/:username/follow", addFollower);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}

export default UserRoutes;
