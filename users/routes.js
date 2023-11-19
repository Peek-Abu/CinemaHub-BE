import * as dao from './dao.js';

function UserRoutes(app)
{
    app.get('/api/users', async (req, res) => {
        console.log('GET /api/users');
        const users = await dao.findAllUsers();
        res.json(users);
    });

    // app.get('/users/:username', async (req, res) => {

    app.post('/api/users', async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    });
}

export default UserRoutes;