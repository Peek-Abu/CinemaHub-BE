import model from "./model.js";

// TODO this may need to be updated since nested ObjectId
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findOne({ _id: userId });
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (usr, pass) =>
  model.findOne({ username: usr, password: pass });

// TODO this may need to be updated since nested ObjectId
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
