import model from "./modelschema.js";

export const findAllUsers = () => {
    return model.find();
};

export const findUserByUsername = (username) => {
    return model.findById(username);
}

export const createUser = (user) => {
    return model.create(user);
};