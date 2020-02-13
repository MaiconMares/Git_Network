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
    },
    async update(request, response) {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
        return response.json(user);
    },
    async destroy(request, response) {
        const user = await User.findByIdAndRemove(request.params.id);
        return response.send('The removal was sucessfull!');
    }
};