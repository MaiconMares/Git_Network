const mongoose = require('mongoose');
const requireDir = require('require-dir');
requireDir('./../models');

const User = mongoose.model('User');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const users = await User.paginate({}, { page, limit: 10 });
        return response.json(users);
    },
    async store(request, response) {
        const user = await User.create(request.body);

        return response.json(`user created:${user}`);
    }
};