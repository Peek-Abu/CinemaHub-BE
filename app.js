import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './users/routes.js';

mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
});
mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});
mongoose.connect('mongodb+srv://cinemahub-admin:L2tIRabOkI9fLDp6@cinemahub.y3xlihq.mongodb.net/CinemaHub');

const app = express();

app.use(cors());
app.use(express.json());

UserRoutes(app);

app.listen(4000, () => {
    console.log('Server running on port 4000');
});