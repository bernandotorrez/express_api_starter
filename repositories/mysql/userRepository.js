const {
    User
} = require('../../models');
const bcrypt = require('bcrypt');

class UserRepository {
    constructor() {
        this._model = User;
    }

    async login({
        username,
        password
    }) {

        const user = await this._model.findOne({
            where: {
                username: username
            }
        });

        if (!user || user == null) {
            throw new Error('Username not found');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Username or Password is Incorrect');
        }

        return user;

    }

    async register({
        username,
        password
    }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await this._model.create({
                username: username,
                password: hashedPassword,
                level: 'user'
            })

            return user;
        } catch (error) {
            throw new Error('Failed Register User');
        }

    }

    async getUserByUsername({
        username
    }) {
        return this._model.findOne({
            where: {
                username: username
            }
        });
    }
}

module.exports = UserRepository;