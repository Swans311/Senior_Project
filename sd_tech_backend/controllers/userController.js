const User = require('../models/users')

createUser = (req,res) => {
    const body = req.body
    if(!body){
        return res.status(400).json({
            success:false,
            error:"Must provide a user",
        })
    }

    const User = new User(body)

    if(!User){
        return res.status(400).json({
            success:false,
            error:err
        })
    }

    User.save().then(()=>{
        return res.status(201).json({
            success:true,
            id:User._id,
            message: 'User Created',
        })
    }).catch(error=> {
        return res.status(400).json({
            error,
            message: 'Movie Not Created',
        })
    })

}

updateUser = async (req, res) => {
    const body = req.body
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        User.email = body.email
        User.password = body.password
        User.userType = body.userType
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: User._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!User) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: User })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, User) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!User) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: User })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, User) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!User.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: User })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUserById,
}