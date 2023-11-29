import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findOne({ _id: userId });
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (usr, pass) =>
  model.findOne({ username: usr, password: pass });
export const findUsersByNames = (username, role, minFollowing) =>
  model.find({
    username: { $regex: username, $options: "i" },
    ...(role !== undefined ? { role: role } : {}),
    // Following is an array of following user ids, ensure that the length is greater than or equal to minFollowing
    ...(minFollowing !== undefined ? {
      following:
        { $size: parseInt(minFollowing) }
    } : {}),
  });
// TODO this may need to be updated since nested ObjectId
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
