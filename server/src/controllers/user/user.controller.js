const UserModel = require('../../models/user.model');

const FindAllUsers = async (req, res) => {
    try {
        const findAll = await UserModel.find();
        if (!findAll) res.status(400).json({ message: 'No fount users' })

        return res.status(200).json({
            users: find
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const FindByIdUSer = async (req, res) => {
    try {
        const { id } = req.query;
        const findId = await UserModel.find({ _id: id });
        if (findId) res.status(400).json({ message: 'No fount user for id' })

        return res.status(200).json({ user: findId })
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = { FindAllUsers, FindByIdUSer }