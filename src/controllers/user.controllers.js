const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users)
});

const create = catchError(async(req, res) => {
    const {first_name, last_name, email, password, birthday} = req.body;
    const user = await User.create({
        first_name, 
        last_name , 
        email, 
        password,
        birthday
    });
    return res.status(201).json(user);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(! user) return res.status(404).json({message: "User not found"})
    return res.json(user)
});

const deleteUser = catchError(async(req, res) =>{
    const { id } = req.params;
    const userDeleted = await User.destroy({where: {id: id }}); 
    if(userDeleted === 0) return res.status(404).json({message: "User not found"})
    return res.sendStatus(204);
});

const update = catchError(async(req, res) =>{
    const { id } = req.params;
    const { name: first_name, last_name, email, password, birthday } = req.body;
    const user = await User.update(
        {first_name, last_name, email, password, birthday},
        {where: {id}, returning: true}
        );
        if(user[0] === 0) return res.status(404).json({message: "User not found"})
        return res.json(user[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    deleteUser,
    update
}